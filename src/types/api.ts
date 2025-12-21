export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type BodyType = 'json' | 'formdata' | 'raw';

export interface EndpointHeader {
  key: string;
  value: string;
  required?: boolean;
}

export interface EndpointBody {
  type: BodyType;
  example: string;
}

export interface FlowVisualization {
  nodeSequence: string[];
  timing: Record<string, number>;
}

export interface Endpoint {
  id: string;
  name: string;
  description: string;
  method: HTTPMethod;
  path: string;
  headers?: EndpointHeader[];
  body?: EndpointBody;
  flowVisualization?: FlowVisualization;
}

export interface APIConfig {
  baseUrl: string;
  endpoints: Endpoint[];
}

export interface APIResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  error?: string;
}
