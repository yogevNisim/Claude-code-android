import type { ComponentDefinition } from './types';

export const COMPONENT_DEFINITIONS: ComponentDefinition[] = [
  // Infrastructure
  {
    type: 'server',
    label: 'Server',
    icon: 'server',
    color: '#3B82F6',
    description: 'Compute server',
    category: 'Infrastructure'
  },
  {
    type: 'container',
    label: 'Container',
    icon: 'box',
    color: '#0EA5E9',
    description: 'Docker container',
    category: 'Infrastructure'
  },
  {
    type: 'load-balancer',
    label: 'Load Balancer',
    icon: 'git-branch',
    color: '#06B6D4',
    description: 'Traffic distribution',
    category: 'Infrastructure'
  },
  {
    type: 'cdn',
    label: 'CDN',
    icon: 'globe',
    color: '#14B8A6',
    description: 'Content delivery',
    category: 'Infrastructure'
  },
  {
    type: 'dns',
    label: 'DNS',
    icon: 'globe-2',
    color: '#10B981',
    description: 'Domain name system',
    category: 'Infrastructure'
  },

  // Databases
  {
    type: 'database',
    label: 'Database',
    icon: 'database',
    color: '#8B5CF6',
    description: 'Generic database',
    category: 'Database'
  },
  {
    type: 'postgresql',
    label: 'PostgreSQL',
    icon: 'database',
    color: '#336791',
    description: 'Relational database',
    category: 'Database'
  },
  {
    type: 'mongodb',
    label: 'MongoDB',
    icon: 'database',
    color: '#4DB33D',
    description: 'NoSQL database',
    category: 'Database'
  },
  {
    type: 'redis',
    label: 'Redis',
    icon: 'database',
    color: '#DC382D',
    description: 'In-memory cache',
    category: 'Database'
  },

  // Storage & Queue
  {
    type: 'object-storage',
    label: 'Object Storage',
    icon: 'hard-drive',
    color: '#84CC16',
    description: 'Cloud storage',
    category: 'Infrastructure'
  },
  {
    type: 'cache',
    label: 'Cache',
    icon: 'layers',
    color: '#F59E0B',
    description: 'Caching layer',
    category: 'Infrastructure'
  },
  {
    type: 'message-queue',
    label: 'Message Queue',
    icon: 'inbox',
    description: 'Async messaging',
    color: '#EF4444',
    category: 'Infrastructure'
  },

  // Compute
  {
    type: 'lambda',
    label: 'Serverless',
    icon: 'zap',
    color: '#F97316',
    description: 'Function as a service',
    category: 'Compute'
  },
  {
    type: 'kubernetes',
    label: 'Kubernetes',
    icon: 'hexagon',
    color: '#326CE5',
    description: 'Container orchestration',
    category: 'Compute'
  },
  {
    type: 'worker',
    label: 'Worker',
    icon: 'cpu',
    color: '#EC4899',
    description: 'Background job',
    category: 'Compute'
  },

  // Application Services
  {
    type: 'frontend',
    label: 'Frontend',
    icon: 'layout',
    color: '#06B6D4',
    description: 'Client application',
    category: 'Application'
  },
  {
    type: 'backend',
    label: 'Backend',
    icon: 'server',
    color: '#8B5CF6',
    description: 'Server application',
    category: 'Application'
  },
  {
    type: 'api-gateway',
    label: 'API Gateway',
    icon: 'network',
    color: '#F59E0B',
    description: 'API management',
    category: 'Application'
  },
  {
    type: 'microservice',
    label: 'Microservice',
    icon: 'component',
    color: '#3B82F6',
    description: 'Service component',
    category: 'Application'
  },
  {
    type: 'websocket',
    label: 'WebSocket',
    icon: 'radio',
    color: '#14B8A6',
    description: 'Real-time server',
    category: 'Application'
  },
  {
    type: 'graphql',
    label: 'GraphQL',
    icon: 'git-graph',
    color: '#E11D48',
    description: 'GraphQL API',
    category: 'Application'
  },
  {
    type: 'auth',
    label: 'Auth Service',
    icon: 'shield',
    color: '#4F46E5',
    description: 'Authentication',
    category: 'Application'
  },

  // DevOps & Tools
  {
    type: 'cicd',
    label: 'CI/CD',
    icon: 'git-pull-request',
    color: '#10B981',
    description: 'Build pipeline',
    category: 'DevOps'
  },
  {
    type: 'monitoring',
    label: 'Monitoring',
    icon: 'activity',
    color: '#F59E0B',
    description: 'System monitoring',
    category: 'DevOps'
  },
  {
    type: 'logging',
    label: 'Logging',
    icon: 'file-text',
    color: '#6366F1',
    description: 'Log aggregation',
    category: 'DevOps'
  }
];

export const COMPONENT_WIDTH = 180;
export const COMPONENT_HEIGHT = 100;
export const GRID_SIZE = 20;
export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 2;
export const ZOOM_SPEED = 0.1;
