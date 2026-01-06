import React from 'react';
import { Download, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import './Toolbar.css';

interface ToolbarProps {
  onExport: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  zoom: number;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onExport,
  onZoomIn,
  onZoomOut,
  onResetView,
  zoom
}) => {
  return (
    <div className="toolbar glass">
      <div className="toolbar-group">
        <button
          className="toolbar-button"
          onClick={onZoomIn}
          title="Zoom In"
        >
          <ZoomIn size={20} />
        </button>
        <div className="zoom-level">{Math.round(zoom * 100)}%</div>
        <button
          className="toolbar-button"
          onClick={onZoomOut}
          title="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>
      </div>

      <div className="toolbar-divider" />

      <button
        className="toolbar-button"
        onClick={onResetView}
        title="Reset View"
      >
        <Maximize2 size={20} />
      </button>

      <div className="toolbar-divider" />

      <button
        className="toolbar-button toolbar-button-primary"
        onClick={onExport}
        title="Export as JSON"
      >
        <Download size={20} />
        <span>Export</span>
      </button>
    </div>
  );
};
