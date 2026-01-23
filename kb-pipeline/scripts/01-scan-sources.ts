#!/usr/bin/env npx tsx
/**
 * 01-scan-sources.ts
 * Scan all source files and generate inventory report
 */

import { join, relative, extname, basename } from 'path';
import { existsSync, statSync } from 'fs';
import { config, configLoader, modules } from '../lib/config.js';
import { findFiles, writeJson, writeMarkdown, logger, detectVersion, Progress } from '../lib/utils.js';

interface SourceFile {
  path: string;
  relativePath: string;
  type: 'markdown' | 'html' | 'prd' | 'frontend' | 'backend' | 'prisma' | 'other';
  size: number;
  version: string;
  module?: string;
}

interface ScanResult {
  timestamp: string;
  totalFiles: number;
  byType: Record<string, number>;
  byModule: Record<string, number>;
  files: SourceFile[];
  coverage: {
    documented: string[];
    missing: string[];
  };
}

async function scanSources(): Promise<ScanResult> {
  logger.step('SCAN', 'Starting source scan...');
  
  const result: ScanResult = {
    timestamp: new Date().toISOString(),
    totalFiles: 0,
    byType: {},
    byModule: {},
    files: [],
    coverage: {
      documented: [],
      missing: [],
    },
  };

  const pipelineRoot = join(configLoader.resolvePath('.'));

  // Scan existing docs
  const docsPath = configLoader.resolvePath(config.sources.docsExisting);
  if (existsSync(docsPath)) {
    logger.info(`Scanning existing docs: ${docsPath}`);
    const mdFiles = await findFiles('**/*.md', docsPath);
    
    for (const file of mdFiles) {
      result.files.push({
        path: file,
        relativePath: relative(pipelineRoot, file),
        type: 'markdown',
        size: statSync(file).size,
        version: detectVersion(file),
      });
    }
  }

  // Scan PRDs
  const prdPath = configLoader.resolvePath(config.sources.prd);
  if (existsSync(prdPath)) {
    logger.info(`Scanning PRDs: ${prdPath}`);
    const prdFiles = await findFiles('**/*.md', prdPath);
    
    for (const file of prdFiles) {
      result.files.push({
        path: file,
        relativePath: relative(pipelineRoot, file),
        type: 'prd',
        size: statSync(file).size,
        version: detectVersion(file),
      });
    }
  }

  // Scan docs_raw for HTML
  const rawPath = configLoader.resolvePath(config.sources.docsRaw);
  if (existsSync(rawPath)) {
    logger.info(`Scanning raw docs: ${rawPath}`);
    const htmlFiles = await findFiles('**/*.html', rawPath);
    
    for (const file of htmlFiles) {
      result.files.push({
        path: file,
        relativePath: relative(pipelineRoot, file),
        type: 'html',
        size: statSync(file).size,
        version: detectVersion(file),
      });
    }
  }

  // Scan frontend pages
  const frontendPath = configLoader.resolvePath(config.sources.frontend);
  if (existsSync(frontendPath)) {
    logger.info(`Scanning frontend: ${frontendPath}`);
    const pageFiles = await findFiles('pages/**/*.tsx', frontendPath);
    
    for (const file of pageFiles) {
      const filename = basename(file);
      let detectedModule: string | undefined;
      
      // Match to module
      for (const mod of modules.modules) {
        if (mod.frontendPages.some(p => filename.includes(p.replace('.tsx', '')))) {
          detectedModule = mod.id;
          break;
        }
      }
      
      result.files.push({
        path: file,
        relativePath: relative(pipelineRoot, file),
        type: 'frontend',
        size: statSync(file).size,
        version: 'current',
        module: detectedModule,
      });
    }
  }

  // Scan Prisma schema
  const prismaPath = configLoader.resolvePath(config.sources.prisma);
  if (existsSync(prismaPath)) {
    logger.info(`Found Prisma schema: ${prismaPath}`);
    result.files.push({
      path: prismaPath,
      relativePath: relative(pipelineRoot, prismaPath),
      type: 'prisma',
      size: statSync(prismaPath).size,
      version: 'current',
    });
  }

  // Calculate statistics
  result.totalFiles = result.files.length;
  
  for (const file of result.files) {
    result.byType[file.type] = (result.byType[file.type] || 0) + 1;
    if (file.module) {
      result.byModule[file.module] = (result.byModule[file.module] || 0) + 1;
    }
  }

  // Check module coverage
  const documentedModules = new Set<string>();
  for (const file of result.files) {
    if (file.type === 'markdown' || file.type === 'prd') {
      // Detect module from content later
      if (file.module) {
        documentedModules.add(file.module);
      }
    }
  }

  for (const mod of modules.modules) {
    if (documentedModules.has(mod.id)) {
      result.coverage.documented.push(mod.id);
    } else {
      result.coverage.missing.push(mod.id);
    }
  }

  return result;
}

function generateReport(result: ScanResult): string {
  let report = `# Source Scan Report

> Generated: ${result.timestamp}

## Summary

| Metric | Value |
|--------|-------|
| Total Files | ${result.totalFiles} |
| Markdown Docs | ${result.byType['markdown'] || 0} |
| PRDs | ${result.byType['prd'] || 0} |
| HTML Docs | ${result.byType['html'] || 0} |
| Frontend Pages | ${result.byType['frontend'] || 0} |
| Prisma Schema | ${result.byType['prisma'] || 0} |

## Module Coverage

### ✅ Documented Modules
${result.coverage.documented.length > 0 
  ? result.coverage.documented.map(m => `- ${m}`).join('\n')
  : '- None detected'}

### ❌ Missing Documentation
${result.coverage.missing.length > 0 
  ? result.coverage.missing.map(m => `- ${m}`).join('\n')
  : '- All modules documented!'}

## Files by Type

`;

  // Group files by type
  const byType: Record<string, SourceFile[]> = {};
  for (const file of result.files) {
    if (!byType[file.type]) byType[file.type] = [];
    byType[file.type].push(file);
  }

  for (const [type, files] of Object.entries(byType)) {
    report += `### ${type.toUpperCase()}\n\n`;
    for (const file of files) {
      const sizeKB = (file.size / 1024).toFixed(1);
      report += `- \`${file.relativePath}\` (${sizeKB} KB) ${file.version !== 'current' ? `[${file.version}]` : ''}\n`;
    }
    report += '\n';
  }

  return report;
}

// Main execution
async function main() {
  try {
    const result = await scanSources();
    
    // Ensure output directories exist
    const outputPath = configLoader.resolvePath(config.output.reports);
    const indexPath = configLoader.resolvePath(config.output.index);
    
    // Save JSON result
    writeJson(join(indexPath, 'source-scan.json'), result);
    logger.success(`Saved scan results to ${join(indexPath, 'source-scan.json')}`);
    
    // Save report
    const report = generateReport(result);
    writeMarkdown(join(outputPath, 'source-scan-report.md'), report);
    logger.success(`Saved report to ${join(outputPath, 'source-scan-report.md')}`);
    
    // Summary
    console.log('\n' + '='.repeat(50));
    logger.info(`Found ${result.totalFiles} source files`);
    logger.info(`Types: ${Object.entries(result.byType).map(([k, v]) => `${k}=${v}`).join(', ')}`);
    
    if (result.coverage.missing.length > 0) {
      logger.warn(`Missing docs for: ${result.coverage.missing.join(', ')}`);
    }
    
    if (result.byType['html'] === 0 || result.byType['html'] === undefined) {
      logger.warn('No HTML docs found! Will generate from source code in next step.');
    }

  } catch (error) {
    logger.error(`Scan failed: ${error}`);
    process.exit(1);
  }
}

main();
