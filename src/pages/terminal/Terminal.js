import React, { useState, useRef, useEffect } from 'react';

const Terminal = ({ code }) => {
  const [height, setHeight] = useState(200); // Initial height
  const terminalRef = useRef(null);

  // Function to handle terminal resizing
  const startResizing = (e) => {
    e.preventDefault();
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
  };

  const resize = (e) => {
    const dimensions = terminalRef.current.getBoundingClientRect();
    setHeight(window.innerHeight - e.clientY);
  };

  const stopResizing = () => {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResizing);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{
        position: 'fixed',
        bottom: 0,
        left: '300px', // Adjust this based on your sidebar + vertical toolbar width
        right: 0,
        backgroundColor: '#333',
        color: '#fff',
        fontFamily: 'monospace',
        padding: '10px',
        height: `${height}px`,
        overflow: 'auto',
        borderTop: '2px solid #555', // Added for visual separation
      }}
    >
      <pre>{code}</pre>
      <div
        onMouseDown={startResizing}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          cursor: 'ns-resize',
          width: '100%',
          height: '10px', // This acts as the draggable area for resizing
        }}
      ></div>
    </div>
  );
};

export default Terminal;
