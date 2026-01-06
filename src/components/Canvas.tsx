import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ComponentPalette } from './ComponentPalette';
import { DiagramComponent } from './DiagramComponent';
import { ConnectionLine } from './ConnectionLine';
import { ContextMenu } from './ContextMenu';
import { Toolbar } from './Toolbar';
import type {
  DiagramComponent as DiagramComponentType,
  Connection,
  ComponentType,
  Position,
  CanvasState
} from '../types';
import { COMPONENT_DEFINITIONS, COMPONENT_WIDTH, COMPONENT_HEIGHT, MIN_ZOOM, MAX_ZOOM, ZOOM_SPEED } from '../constants';
import { generateId, exportToJSON } from '../utils';
import { useTouchGestures } from '../hooks/useTouchGestures';
import './Canvas.css';

export const Canvas: React.FC = () => {
  const [state, setState] = useState<CanvasState>({
    components: [],
    connections: [],
    zoom: 1,
    pan: { x: 0, y: 0 }
  });

  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [draggingComponentId, setDraggingComponentId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<Position>({ x: 0, y: 0 });
  const [contextMenu, setContextMenu] = useState<{ position: Position; componentId?: string } | null>(null);
  const [draggedComponentType, setDraggedComponentType] = useState<ComponentType | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Touch gestures for mobile
  useTouchGestures(canvasRef, {
    onPinchZoom: (scale) => {
      setState(prev => ({
        ...prev,
        zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev.zoom * scale))
      }));
    },
    onTwoFingerPan: (dx, dy) => {
      setState(prev => ({
        ...prev,
        pan: { x: prev.pan.x + dx, y: prev.pan.y + dy }
      }));
    }
  });

  // Handle component drag from palette
  const handlePaletteDragStart = (type: ComponentType) => {
    setDraggedComponentType(type);
  };

  // Handle drop on canvas
  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedComponentType || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - state.pan.x) / state.zoom;
    const y = (e.clientY - rect.top - state.pan.y) / state.zoom;

    const definition = COMPONENT_DEFINITIONS.find(d => d.type === draggedComponentType);
    if (!definition) return;

    const newComponent: DiagramComponentType = {
      id: generateId(),
      type: draggedComponentType,
      label: definition.label,
      position: { x: x - COMPONENT_WIDTH / 2, y: y - COMPONENT_HEIGHT / 2 }
    };

    setState(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }));

    setDraggedComponentType(null);
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle component dragging on canvas
  const handleComponentDragStart = useCallback((componentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const component = state.components.find(c => c.id === componentId);
    if (!component) return;

    setDraggingComponentId(componentId);
    setSelectedComponentId(componentId);
    setSelectedConnectionId(null);

    const offsetX = (e.clientX - state.pan.x) / state.zoom - component.position.x;
    const offsetY = (e.clientY - state.pan.y) / state.zoom - component.position.y;
    setDragOffset({ x: offsetX, y: offsetY });
  }, [state.components, state.pan, state.zoom]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (draggingComponentId) {
      const newX = (e.clientX - state.pan.x) / state.zoom - dragOffset.x;
      const newY = (e.clientY - state.pan.y) / state.zoom - dragOffset.y;

      setState(prev => ({
        ...prev,
        components: prev.components.map(c =>
          c.id === draggingComponentId
            ? { ...c, position: { x: newX, y: newY } }
            : c
        )
      }));
    } else if (isPanning) {
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;

      setState(prev => ({
        ...prev,
        pan: {
          x: prev.pan.x + dx,
          y: prev.pan.y + dy
        }
      }));

      setPanStart({ x: e.clientX, y: e.clientY });
    }
  }, [draggingComponentId, isPanning, panStart, dragOffset, state.pan, state.zoom]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setDraggingComponentId(null);
    setIsPanning(false);
  }, []);

  useEffect(() => {
    if (draggingComponentId || isPanning) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggingComponentId, isPanning, handleMouseMove, handleMouseUp]);

  // Handle canvas pan
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && e.target === canvasRef.current) {
      setIsPanning(true);
      setPanStart({ x: e.clientX, y: e.clientY });
      setSelectedComponentId(null);
      setSelectedConnectionId(null);
    }
  };

  // Handle zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_SPEED : ZOOM_SPEED;
    setState(prev => ({
      ...prev,
      zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev.zoom + delta))
    }));
  };

  // Handle context menu
  const handleContextMenu = (e: React.MouseEvent, componentId?: string) => {
    e.preventDefault();
    setContextMenu({
      position: { x: e.clientX, y: e.clientY },
      componentId
    });
  };

  // Handle component double click (edit label)
  const handleComponentDoubleClick = (componentId: string) => {
    const component = state.components.find(c => c.id === componentId);
    if (component) {
      const newLabel = prompt('Enter new label:', component.label);
      if (newLabel && newLabel.trim()) {
        setState(prev => ({
          ...prev,
          components: prev.components.map(c =>
            c.id === componentId ? { ...c, label: newLabel.trim() } : c
          )
        }));
      }
    }
  };

  // Delete component
  const handleDeleteComponent = (componentId: string) => {
    setState(prev => ({
      ...prev,
      components: prev.components.filter(c => c.id !== componentId),
      connections: prev.connections.filter(
        conn => conn.sourceId !== componentId && conn.targetId !== componentId
      )
    }));
    setSelectedComponentId(null);
  };

  // Duplicate component
  const handleDuplicateComponent = (componentId: string) => {
    const component = state.components.find(c => c.id === componentId);
    if (!component) return;

    const newComponent: DiagramComponentType = {
      ...component,
      id: generateId(),
      position: {
        x: component.position.x + 50,
        y: component.position.y + 50
      }
    };

    setState(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }));
  };

  // Delete connection
  const handleDeleteConnection = () => {
    if (selectedConnectionId) {
      setState(prev => ({
        ...prev,
        connections: prev.connections.filter(c => c.id !== selectedConnectionId)
      }));
      setSelectedConnectionId(null);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedComponentId) {
          handleDeleteComponent(selectedComponentId);
        } else if (selectedConnectionId) {
          handleDeleteConnection();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponentId, selectedConnectionId]);

  // Handle connection creation (simplified - click two components to connect)
  const handleComponentClick = (componentId: string) => {
    if (connectingFrom === null) {
      setConnectingFrom(componentId);
    } else if (connectingFrom !== componentId) {
      const newConnection: Connection = {
        id: generateId(),
        sourceId: connectingFrom,
        targetId: componentId
      };
      setState(prev => ({
        ...prev,
        connections: [...prev.connections, newConnection]
      }));
      setConnectingFrom(null);
    } else {
      setConnectingFrom(null);
    }
  };

  // Toolbar actions
  const handleZoomIn = () => {
    setState(prev => ({
      ...prev,
      zoom: Math.min(MAX_ZOOM, prev.zoom + ZOOM_SPEED)
    }));
  };

  const handleZoomOut = () => {
    setState(prev => ({
      ...prev,
      zoom: Math.max(MIN_ZOOM, prev.zoom - ZOOM_SPEED)
    }));
  };

  const handleResetView = () => {
    setState(prev => ({
      ...prev,
      zoom: 1,
      pan: { x: 0, y: 0 }
    }));
  };

  const handleExport = () => {
    exportToJSON({
      components: state.components,
      connections: state.connections,
      version: '1.0.0',
      exportedAt: new Date().toISOString()
    });
  };

  return (
    <div className="canvas-container">
      <ComponentPalette onDragStart={handlePaletteDragStart} />
      <Toolbar
        onExport={handleExport}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
        zoom={state.zoom}
      />

      <div
        ref={canvasRef}
        className="canvas"
        onMouseDown={handleCanvasMouseDown}
        onWheel={handleWheel}
        onDrop={handleCanvasDrop}
        onDragOver={handleCanvasDragOver}
        onContextMenu={(e) => handleContextMenu(e)}
      >
        <div
          className="canvas-content"
          style={{
            transform: `translate(${state.pan.x}px, ${state.pan.y}px) scale(${state.zoom})`
          }}
        >
          {/* SVG for connections */}
          <svg
            ref={svgRef}
            className="connections-svg"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            <g style={{ pointerEvents: 'all' }}>
              {state.connections.map(connection => (
                <ConnectionLine
                  key={connection.id}
                  connection={connection}
                  components={state.components}
                  isSelected={connection.id === selectedConnectionId}
                  onClick={() => setSelectedConnectionId(connection.id)}
                />
              ))}
            </g>
          </svg>

          {/* Components */}
          {state.components.map(component => (
            <DiagramComponent
              key={component.id}
              component={component}
              isSelected={component.id === selectedComponentId}
              onSelect={() => {
                setSelectedComponentId(component.id);
                setSelectedConnectionId(null);
                handleComponentClick(component.id);
              }}
              onDragStart={(e) => handleComponentDragStart(component.id, e)}
              onDoubleClick={() => handleComponentDoubleClick(component.id)}
              onContextMenu={(e) => handleContextMenu(e, component.id)}
            />
          ))}
        </div>
      </div>

      {contextMenu && (
        <ContextMenu
          position={contextMenu.position}
          onEdit={contextMenu.componentId ? () => handleComponentDoubleClick(contextMenu.componentId!) : undefined}
          onDelete={
            contextMenu.componentId
              ? () => handleDeleteComponent(contextMenu.componentId!)
              : selectedConnectionId
              ? handleDeleteConnection
              : undefined
          }
          onDuplicate={contextMenu.componentId ? () => handleDuplicateComponent(contextMenu.componentId!) : undefined}
          onClose={() => setContextMenu(null)}
        />
      )}

      {connectingFrom && (
        <div className="connection-hint">
          Click another component to create a connection
        </div>
      )}
    </div>
  );
};
