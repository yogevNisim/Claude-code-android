import type { Position } from './types';

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getBezierPath = (
  start: Position,
  end: Position
): string => {
  const dx = end.x - start.x;

  // Control points for a smooth curved connection
  const cp1x = start.x + dx * 0.5;
  const cp1y = start.y;
  const cp2x = end.x - dx * 0.5;
  const cp2y = end.y;

  return `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;
};

export const getDistance = (p1: Position, p2: Position): number => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const isPointInRect = (
  point: Position,
  rectPos: Position,
  width: number,
  height: number
): boolean => {
  return (
    point.x >= rectPos.x &&
    point.x <= rectPos.x + width &&
    point.y >= rectPos.y &&
    point.y <= rectPos.y + height
  );
};

export const exportToJSON = (data: any): void => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `architecture-diagram-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
