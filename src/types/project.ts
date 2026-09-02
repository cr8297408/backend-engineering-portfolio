import type { DiagramData } from './diagram';
import type { APIConfig } from './api';

export type ProjectStatus = 'completed' | 'in-progress' | 'archived';

export interface ProjectDiagrams {
  architecture?: DiagramData;
  infrastructure?: DiagramData;
}

export interface KeyFeature {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  status: ProjectStatus;
  featured?: boolean;
  diagrams?: ProjectDiagrams;
  keyFeatures?: KeyFeature[];
  api?: APIConfig;
  github?: string;
  demo?: string;
  images?: string[];
  publishedAt?: string;
}
