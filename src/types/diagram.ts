export type NodeType = 'service' | 'database' | 'api' | 'queue' | 'cache' | 'external' | 'custom';

export type EdgeType = 'default' | 'smoothstep' | 'step' | 'straight';

export interface NodeData {
  label: string;
  icon?: string;
  description?: string;
  details?: string;
  technologies?: string[];
  metrics?: Record<string, string>;
}

export interface DiagramNode {
  id: string;
  type: NodeType;
  position: {
    x: number;
    y: number;
  };
  data: NodeData;
}

export interface DiagramEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  type?: EdgeType;
  style?: Record<string, string>;
}

export interface DiagramData {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}
