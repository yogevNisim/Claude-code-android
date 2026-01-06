import type { ComponentDefinition } from './types';

export const COMPONENT_DEFINITIONS: ComponentDefinition[] = [
  {
    type: 'postgresql',
    label: 'PostgreSQL',
    icon: 'database',
    color: '#336791',
    description: 'Relational database'
  },
  {
    type: 'mongodb',
    label: 'MongoDB',
    icon: 'database',
    color: '#4DB33D',
    description: 'NoSQL database'
  },
  {
    type: 'redis',
    label: 'Redis',
    icon: 'database',
    color: '#DC382D',
    description: 'In-memory cache'
  },
  {
    type: 'api-gateway',
    label: 'API Gateway',
    icon: 'network',
    color: '#FF9900',
    description: 'API management'
  },
  {
    type: 'load-balancer',
    label: 'Load Balancer',
    icon: 'git-branch',
    color: '#00A4EF',
    description: 'Traffic distribution'
  },
  {
    type: 'kubernetes',
    label: 'Kubernetes',
    icon: 'box',
    color: '#326CE5',
    description: 'Container orchestration'
  },
  {
    type: 's3',
    label: 'S3 Storage',
    icon: 'hard-drive',
    color: '#569A31',
    description: 'Object storage'
  },
  {
    type: 'cdn',
    label: 'CDN',
    icon: 'globe',
    color: '#FF6B35',
    description: 'Content delivery'
  },
  {
    type: 'message-queue',
    label: 'Message Queue',
    icon: 'mail',
    color: '#FF4F64',
    description: 'Async messaging'
  },
  {
    type: 'lambda',
    label: 'Lambda',
    icon: 'zap',
    color: '#FF9900',
    description: 'Serverless function'
  },
  {
    type: 'auth',
    label: 'Auth Service',
    icon: 'shield',
    color: '#4285F4',
    description: 'Authentication'
  }
];

export const COMPONENT_WIDTH = 180;
export const COMPONENT_HEIGHT = 100;
export const GRID_SIZE = 20;
export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 2;
export const ZOOM_SPEED = 0.1;
