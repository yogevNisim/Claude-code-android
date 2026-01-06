export type ComponentType =
  | 'postgresql'
  | 'mongodb'
  | 'redis'
  | 'api-gateway'
  | 'load-balancer'
  | 'kubernetes'
  | 's3'
  | 'cdn'
  | 'message-queue'
  | 'lambda'
  | 'auth';

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

export interface ComponentDefinition {
  type: ComponentType;
  label: string;
  icon: string;
  color: string;
  description: string;
}
