import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

interface TouchGesturesOptions {
  onPinchZoom?: (scale: number) => void;
  onTwoFingerPan?: (dx: number, dy: number) => void;
}

export const useTouchGestures = (
  elementRef: RefObject<HTMLElement | null>,
  options: TouchGesturesOptions
) => {
  const lastTouchDistance = useRef<number>(0);
  const lastTouchCenter = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const getTouchDistance = (touches: TouchList): number => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getTouchCenter = (touches: TouchList): { x: number; y: number } => {
      return {
        x: (touches[0].clientX + touches[1].clientX) / 2,
        y: (touches[0].clientY + touches[1].clientY) / 2
      };
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        lastTouchDistance.current = getTouchDistance(e.touches);
        lastTouchCenter.current = getTouchCenter(e.touches);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();

        const currentDistance = getTouchDistance(e.touches);
        const currentCenter = getTouchCenter(e.touches);

        // Pinch zoom
        if (options.onPinchZoom && lastTouchDistance.current > 0) {
          const scale = currentDistance / lastTouchDistance.current;
          options.onPinchZoom(scale);
        }

        // Two-finger pan
        if (options.onTwoFingerPan && lastTouchCenter.current) {
          const dx = currentCenter.x - lastTouchCenter.current.x;
          const dy = currentCenter.y - lastTouchCenter.current.y;
          options.onTwoFingerPan(dx, dy);
        }

        lastTouchDistance.current = currentDistance;
        lastTouchCenter.current = currentCenter;
      }
    };

    const handleTouchEnd = () => {
      lastTouchDistance.current = 0;
      lastTouchCenter.current = null;
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [elementRef, options]);
};
