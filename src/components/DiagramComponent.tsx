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
import type { DiagramComponent as DiagramComponentType } from '../types';
import { COMPONENT_DEFINITIONS, COMPONENT_WIDTH, COMPONENT_HEIGHT } from '../constants';
import './DiagramComponent.css';

interface DiagramComponentProps {
  component: DiagramComponentType;
  isSelected: boolean;
  onSelect: () => void;
  onDragStart: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
  server: Server,
  database: Database,
  network: Network,
  'git-branch': GitBranch,
  box: Box,
  'hard-drive': HardDrive,
  globe: Globe,
  'globe-2': Globe2,
  inbox: Inbox,
  zap: Zap,
  shield: Shield,
  layers: Layers,
  hexagon: Hexagon,
  cpu: Cpu,
  layout: Layout,
  component: ComponentIcon,
  radio: Radio,
  'git-graph': GitGraph,
  'git-pull-request': GitPullRequest,
  activity: Activity,
  'file-text': FileText
};

export const DiagramComponent: React.FC<DiagramComponentProps> = ({
  component,
  isSelected,
  onSelect,
  onDragStart,
  onDoubleClick,
  onContextMenu
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const definition = COMPONENT_DEFINITIONS.find(d => d.type === component.type);
  if (!definition) return null;

  const Icon = iconMap[definition.icon];

  return (
    <div
      className={`diagram-component ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
      style={{
        left: component.position.x,
        top: component.position.y,
        width: COMPONENT_WIDTH,
        height: COMPONENT_HEIGHT
      }}
      onMouseDown={(e) => {
        onSelect();
        onDragStart(e);
      }}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="component-inner" style={{ borderColor: definition.color }}>
        <div className="component-icon" style={{ color: definition.color }}>
          <Icon size={32} />
        </div>
        <div className="component-label">{component.label}</div>
        <div className="component-type">{definition.description}</div>

        {/* Connection points */}
        <div className="connection-point connection-point-top" data-position="top" />
        <div className="connection-point connection-point-right" data-position="right" />
        <div className="connection-point connection-point-bottom" data-position="bottom" />
        <div className="connection-point connection-point-left" data-position="left" />
      </div>
    </div>
  );
};
