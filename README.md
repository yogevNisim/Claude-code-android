# Voya System Architecture Designer

A sleek, modern system architecture designer web application built with React, TypeScript, and Vite. Create beautiful cloud infrastructure diagrams with an intuitive drag-and-drop interface.

![Voya System Architecture Designer](https://img.shields.io/badge/React-19.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue) ![Vite](https://img.shields.io/badge/Vite-7.2.4-purple)

## Features

### Core Functionality
- **Interactive Canvas** - Pan and zoom with smooth 60fps animations
- **Drag & Drop** - Intuitive component placement from the palette
- **Component Library** - 11 cloud infrastructure building blocks:
  - PostgreSQL, MongoDB, Redis (Databases)
  - API Gateway
  - Load Balancer
  - Kubernetes (Container orchestration)
  - S3 Storage
  - CDN
  - Message Queue
  - Lambda (Serverless functions)
  - Authentication Service

- **Connection System** - Create bezier curve connections between components
- **Edit & Customize** - Double-click to rename components
- **Export Diagrams** - Save your architecture as JSON
- **Delete & Manage** - Remove components and connections with keyboard shortcuts

### Visual Design
- **Dark Theme** - Modern dark navy/charcoal background with blue gradient accents
- **Glassmorphism** - Beautiful frosted glass effects with subtle shadows
- **Smooth Animations** - Polished micro-interactions and transitions
- **Gradient Connections** - Animated bezier curves with gradient strokes
- **Hover Effects** - Glow effects and visual feedback

### User Experience
- **Keyboard Shortcuts** - Delete/Backspace to remove selected items
- **Context Menu** - Right-click for component options
- **Mobile Support** - Touch gestures (pinch to zoom, two-finger pan)
- **Responsive Design** - Works on desktop and mobile devices
- **Visual Feedback** - Connection hints and hover states

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yogevNisim/Claude-code-android.git
cd Claude-code-android

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### Creating a Diagram

1. **Add Components**
   - Drag components from the left palette onto the canvas
   - Components will appear at your cursor position

2. **Create Connections**
   - Click on one component
   - Click on another component to create a connection
   - Connection points appear on hover

3. **Edit Components**
   - Double-click a component to rename it
   - Right-click for more options (Edit, Duplicate, Delete)

4. **Navigate the Canvas**
   - Click and drag the background to pan
   - Scroll to zoom in/out
   - Use toolbar buttons for zoom control

5. **Export Your Work**
   - Click the "Export" button in the top-right toolbar
   - Your diagram will be saved as a JSON file

### Keyboard Shortcuts

- `Delete` or `Backspace` - Remove selected component or connection
- `Escape` - Close context menu
- Mouse wheel - Zoom in/out

### Mobile Gestures

- Pinch - Zoom in/out
- Two-finger drag - Pan the canvas
- Tap - Select component
- Long press - Context menu

## Technology Stack

- **React 19.2** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool and dev server
- **Lucide React** - Icon library
- **CSS3** - Styling with variables and animations

## Project Structure

```
src/
├── components/          # React components
│   ├── Canvas.tsx      # Main canvas component
│   ├── ComponentPalette.tsx
│   ├── DiagramComponent.tsx
│   ├── ConnectionLine.tsx
│   ├── ContextMenu.tsx
│   └── Toolbar.tsx
├── hooks/              # Custom React hooks
│   └── useTouchGestures.ts
├── constants.ts        # App constants and definitions
├── types.ts           # TypeScript type definitions
├── utils.ts           # Utility functions
└── index.css          # Global styles
```

## Architecture Highlights

### State Management
- Uses React hooks (useState, useRef, useCallback)
- Centralized canvas state for components and connections
- No external state management library needed

### Performance Optimizations
- CSS transforms for smooth animations
- Debounced pan and zoom
- Efficient re-renders with React.memo where needed
- Hardware-accelerated CSS animations

### Responsive Design
- CSS custom properties for theming
- Flexible grid layout for component palette
- Mobile-first touch event handling
- Adaptive UI for different screen sizes

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers with touch support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this in your own projects!

## Acknowledgments

Built with modern web technologies and best practices for a premium user experience.

---

**Built for Voya** - A professional system architecture designer for technical audiences and investor presentations.
