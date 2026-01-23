import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface ProjectConfig {
  version: string;
  project: {
    name: string;
    language: string;
    currency: {
      symbol: string;
      locale: string;
      thousandSeparator: string;
      decimalSeparator: string;
    };
  };
  sources: {
    docsRaw: string;
    docsExisting: string;
    prd: string;
    frontend: string;
    backend: string;
    prisma: string;
  };
  output: {
    base: string;
    index: string;
    docs: string;
    chunks: string;
    reports: string;
  };
  chunking: {
    minTokens: number;
    maxTokens: number;
    overlapTokens: number;
    splitBy: string[];
    preserveBlocks: string[];
  };
  conversion: {
    headingStyle: string;
    codeBlockStyle: string;
    bulletListMarker: string;
    strongDelimiter: string;
  };
  versionDetection: {
    patterns: string[];
    preferLatest: boolean;
  };
}

export interface ModuleConfig {
  modules: Array<{
    id: string;
    name: string;
    description: string;
    keywords: string[];
    routes: string[];
    frontendPages: string[];
    backendModules: string[];
    entities: string[];
  }>;
}

export interface TagsTaxonomy {
  taxonomy: {
    [category: string]: {
      description: string;
      tags: string[];
    };
  };
  keywordMapping: {
    [keyword: string]: string[];
  };
}

export interface RoutesMapping {
  routes: {
    [route: string]: {
      module: string;
      page: string;
      personas: string[];
    };
  };
}

class ConfigLoader {
  private configDir: string;
  private cache: Map<string, any> = new Map();

  constructor() {
    this.configDir = join(__dirname, '../config');
  }

  private loadJson<T>(filename: string): T {
    if (this.cache.has(filename)) {
      return this.cache.get(filename) as T;
    }

    const filepath = join(this.configDir, filename);
    if (!existsSync(filepath)) {
      throw new Error(`Config file not found: ${filepath}`);
    }

    const content = readFileSync(filepath, 'utf-8');
    const data = JSON.parse(content) as T;
    this.cache.set(filename, data);
    return data;
  }

  getConfig(): ProjectConfig {
    return this.loadJson<ProjectConfig>('config.json');
  }

  getModules(): ModuleConfig {
    return this.loadJson<ModuleConfig>('modules.json');
  }

  getTaxonomy(): TagsTaxonomy {
    return this.loadJson<TagsTaxonomy>('tags-taxonomy.json');
  }

  getRoutes(): RoutesMapping {
    return this.loadJson<RoutesMapping>('routes-mapping.json');
  }

  // Get absolute path from relative config path
  resolvePath(relativePath: string): string {
    const pipelineRoot = join(__dirname, '..');
    return join(pipelineRoot, relativePath);
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const configLoader = new ConfigLoader();
export const config = configLoader.getConfig();
export const modules = configLoader.getModules();
export const taxonomy = configLoader.getTaxonomy();
export const routes = configLoader.getRoutes();
