import React from 'react';
import type { Connection, DiagramComponent, Position } from '../types';
import { getBezierPath } from '../utils';
import { COMPONENT_WIDTH, COMPONENT_HEIGHT } from '../constants';
import './ConnectionLine.css';

interface ConnectionLineProps {
  connection: Connection;
  components: DiagramComponent[];
  isSelected: boolean;
  onClick: () => void;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  connection,
  components,
  isSelected,
  onClick
}) => {
  const sourceComponent = components.find(c => c.id === connection.sourceId);
  const targetComponent = components.find(c => c.id === connection.targetId);

  if (!sourceComponent || !targetComponent) return null;

  // Calculate center points of components
  const start: Position = {
    x: sourceComponent.position.x + COMPONENT_WIDTH / 2,
    y: sourceComponent.position.y + COMPONENT_HEIGHT / 2
  };

  const end: Position = {
    x: targetComponent.position.x + COMPONENT_WIDTH / 2,
    y: targetComponent.position.y + COMPONENT_HEIGHT / 2
  };

  const pathD = getBezierPath(start, end);

  return (
    <g className={`connection-line ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      {/* Invisible wider path for easier clicking */}
      <path
        d={pathD}
        fill="none"
        stroke="transparent"
        strokeWidth="20"
        style={{ cursor: 'pointer' }}
      />

      {/* Animated gradient definition */}
      <defs>
        <linearGradient id={`gradient-${connection.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent-blue-1)" />
          <stop offset="50%" stopColor="var(--accent-blue-2)" />
          <stop offset="100%" stopColor="var(--accent-cyan)" />
        </linearGradient>
      </defs>

      {/* Main connection line */}
      <path
        d={pathD}
        fill="none"
        stroke={`url(#gradient-${connection.id})`}
        strokeWidth={isSelected ? "3" : "2"}
        strokeLinecap="round"
        className="connection-path"
        style={{
          filter: isSelected ? 'drop-shadow(0 0 8px var(--accent-blue-2))' : 'none'
        }}
      />

      {/* Arrow marker */}
      <defs>
        <marker
          id={`arrow-${connection.id}`}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path
            d="M0,0 L0,6 L9,3 z"
            fill={isSelected ? 'var(--accent-blue-3)' : 'var(--accent-blue-2)'}
          />
        </marker>
      </defs>

      <path
        d={pathD}
        fill="none"
        stroke="transparent"
        strokeWidth="2"
        markerEnd={`url(#arrow-${connection.id})`}
      />
    </g>
  );
};
