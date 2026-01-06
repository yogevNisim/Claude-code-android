import React from 'react';
import {
  Database,
  Network,
  GitBranch,
  Box,
  HardDrive,
  Globe,
  Mail,
  Zap,
  Shield
} from 'lucide-react';
import { COMPONENT_DEFINITIONS } from '../constants';
import type { ComponentType } from '../types';
import './ComponentPalette.css';

interface ComponentPaletteProps {
  onDragStart: (type: ComponentType) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  database: <Database size={20} />,
  network: <Network size={20} />,
  'git-branch': <GitBranch size={20} />,
  box: <Box size={20} />,
  'hard-drive': <HardDrive size={20} />,
  globe: <Globe size={20} />,
  mail: <Mail size={20} />,
  zap: <Zap size={20} />,
  shield: <Shield size={20} />
};

export const ComponentPalette: React.FC<ComponentPaletteProps> = ({ onDragStart }) => {
  const handleDragStart = (type: ComponentType) => (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart(type);
  };

  return (
    <div className="component-palette glass">
      <div className="palette-header">
        <h3>Components</h3>
        <div className="palette-subtitle">Drag to canvas</div>
      </div>
      <div className="palette-grid">
        {COMPONENT_DEFINITIONS.map((def) => (
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
