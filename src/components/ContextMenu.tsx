import React, { useEffect, useRef } from 'react';
import { Edit2, Trash2, Copy } from 'lucide-react';
import type { Position } from '../types';

interface ContextMenuProps {
  position: Position;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  position,
  onEdit,
  onDelete,
  onDuplicate,
  onClose
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{
        left: position.x,
        top: position.y
      }}
    >
      {onEdit && (
        <div
          className="context-menu-item"
          onClick={() => {
            onEdit();
            onClose();
          }}
        >
          <Edit2 size={16} />
          <span>Edit Label</span>
        </div>
      )}
      {onDuplicate && (
        <div
          className="context-menu-item"
          onClick={() => {
            onDuplicate();
            onClose();
          }}
        >
          <Copy size={16} />
          <span>Duplicate</span>
        </div>
      )}
      {onDelete && (
        <div
          className="context-menu-item danger"
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          <Trash2 size={16} />
          <span>Delete</span>
        </div>
      )}
    </div>
  );
};
