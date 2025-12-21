import { ServiceNode } from './ServiceNode';

export const CustomNodeTypes = {
  service: ServiceNode,
  database: ServiceNode,
  api: ServiceNode,
  queue: ServiceNode,
  cache: ServiceNode,
  external: ServiceNode,
  custom: ServiceNode,
};

export { ServiceNode };
