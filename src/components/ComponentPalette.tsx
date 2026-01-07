import React, { useState } from 'react';
import {
  Server,
  Database,
  Network,
  GitBranch,
  Box,
  HardDrive,
  Globe,
  Globe2,
  Inbox,
  Zap,
  Shield,
  Layers,
  Hexagon,
  Cpu,
  Layout,
  Component as ComponentIcon,
  Radio,
  GitGraph,
  GitPullRequest,
  Activity,
  FileText
} from 'lucide-react';
import { COMPONENT_DEFINITIONS } from '../constants';
import type { ComponentType, ComponentCategory } from '../types';
import './ComponentPalette.css';

interface ComponentPaletteProps {
  onDragStart: (type: ComponentType) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  server: <Server size={20} />,
  database: <Database size={20} />,
  network: <Network size={20} />,
  'git-branch': <GitBranch size={20} />,
  box: <Box size={20} />,
  'hard-drive': <HardDrive size={20} />,
  globe: <Globe size={20} />,
  'globe-2': <Globe2 size={20} />,
  inbox: <Inbox size={20} />,
  zap: <Zap size={20} />,
  shield: <Shield size={20} />,
  layers: <Layers size={20} />,
  hexagon: <Hexagon size={20} />,
  cpu: <Cpu size={20} />,
  layout: <Layout size={20} />,
  component: <ComponentIcon size={20} />,
  radio: <Radio size={20} />,
  'git-graph': <GitGraph size={20} />,
  'git-pull-request': <GitPullRequest size={20} />,
  activity: <Activity size={20} />,
  'file-text': <FileText size={20} />
};

const CATEGORIES: ComponentCategory[] = ['Infrastructure', 'Application', 'Database', 'Compute', 'DevOps'];

export const ComponentPalette: React.FC<ComponentPaletteProps> = ({ onDragStart }) => {
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'All'>('All');

  const handleDragStart = (type: ComponentType) => (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart(type);
  };

  const filteredComponents = selectedCategory === 'All'
    ? COMPONENT_DEFINITIONS
    : COMPONENT_DEFINITIONS.filter(def => def.category === selectedCategory);

  return (
    <div className="component-palette glass">
      <div className="palette-header">
        <h3>Components</h3>
        <div className="palette-subtitle">Drag to canvas</div>
      </div>

      <div className="palette-categories">
        <button
          className={`category-tab ${selectedCategory === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="palette-grid">
        {filteredComponents.map((def) => (
          <div
            key={def.type}
            className="palette-item smooth-transition"
            draggable
            onDragStart={handleDragStart(def.type)}
            title={def.description}
          >
            <div className="palette-item-icon" style={{ color: def.color }}>
              {iconMap[def.icon]}
            </div>
            <div className="palette-item-label">{def.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
