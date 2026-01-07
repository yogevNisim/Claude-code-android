export type ComponentType =
  // Infrastructure
  | 'server'
  | 'container'
  | 'load-balancer'
  | 'cdn'
  | 'dns'

  // Databases
  | 'postgresql'
  | 'mongodb'
  | 'redis'
  | 'database'

  // Storage & Queue
  | 'object-storage'
  | 'message-queue'
  | 'cache'

  // Compute
  | 'lambda'
  | 'kubernetes'
  | 'worker'

  // Application Services
  | 'frontend'
  | 'backend'
  | 'api-gateway'
  | 'microservice'
  | 'websocket'
  | 'graphql'
  | 'auth'

  // Tools & DevOps
  | 'cicd'
  | 'monitoring'
  | 'logging';

export interface Position {
  x: number;
  y: number;
}

export interface DiagramComponent {
  id: string;
  type: ComponentType;
  label: string;
  position: Position;
}

export interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
}

export interface CanvasState {
  components: DiagramComponent[];
  connections: Connection[];
  zoom: number;
  pan: Position;
}

export type ComponentCategory = 'Infrastructure' | 'Database' | 'Application' | 'Compute' | 'DevOps';

export interface ComponentDefinition {
  type: ComponentType;
  label: string;
  icon: string;
  color: string;
  description: string;
  category: ComponentCategory;
}
