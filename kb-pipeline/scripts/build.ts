#!/usr/bin/env npx tsx
/**
 * build.ts
 * Main build script - runs all pipeline steps
 */

import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Step {
  name: string;
  script: string;
  required: boolean;
}

const PIPELINE_STEPS: Step[] = [
  { name: 'Scan Sources', script: '01-scan-sources.ts', required: true },
  { name: 'Generate Docs', script: '02-generate-docs.ts', required: true },
  { name: 'Convert HTML', script: '03-convert-html.ts', required: false },
  { name: 'Normalize', script: '04-normalize.ts', required: true },
  { name: 'Chunk', script: '05-chunk.ts', required: true },
  { name: 'Tag', script: '06-tag.ts', required: true },
  { name: 'Glossary', script: '07-glossary.ts', required: true },
  { name: 'FAQ', script: '08-faq.ts', required: true },
  { name: 'Index', script: '09-index.ts', required: true },
];

async function runStep(step: Step): Promise<boolean> {
  const scriptPath = join(__dirname, step.script);
  
  return new Promise((resolve) => {
    console.log(chalk.cyan(`\n${'='.repeat(60)}`));
    console.log(chalk.cyan(`[STEP] ${step.name}`));
    console.log(chalk.cyan('='.repeat(60)));
    
    const child = spawn('npx', ['tsx', scriptPath], {
      stdio: 'inherit',
      shell: true,
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green(`✓ ${step.name} completed`));
        resolve(true);
      } else {
        console.log(chalk.red(`✗ ${step.name} failed with code ${code}`));
        resolve(false);
      }
    });

    child.on('error', (err) => {
      console.log(chalk.red(`✗ ${step.name} error: ${err.message}`));
      resolve(false);
    });
  });
}

async function main() {
  console.log(chalk.bold.blue('\n🚀 KB Pipeline Build Starting...\n'));
  console.log(chalk.gray(`Time: ${new Date().toISOString()}`));
  
  const startTime = Date.now();
  const results: { step: string; success: boolean }[] = [];

  for (const step of PIPELINE_STEPS) {
    const success = await runStep(step);
    results.push({ step: step.name, success });

    if (!success && step.required) {
      console.log(chalk.red(`\n❌ Pipeline stopped: Required step "${step.name}" failed`));
      process.exit(1);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log(chalk.bold.blue(`\n${'='.repeat(60)}`));
  console.log(chalk.bold.blue('📊 Pipeline Summary'));
  console.log(chalk.bold.blue('='.repeat(60)));
  
  for (const result of results) {
    const icon = result.success ? chalk.green('✓') : chalk.red('✗');
    console.log(`  ${icon} ${result.step}`);
  }
  
  const successCount = results.filter(r => r.success).length;
  console.log(chalk.gray(`\nCompleted ${successCount}/${results.length} steps in ${duration}s`));
  
  if (successCount === results.length) {
    console.log(chalk.bold.green('\n✅ Knowledge Base built successfully!\n'));
  } else {
    console.log(chalk.bold.yellow('\n⚠️ Knowledge Base built with warnings\n'));
  }
}

main().catch(console.error);
