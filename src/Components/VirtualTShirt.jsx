import React, { useRef, useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { FiRotateCw, FiMove, FiType } from 'react-icons/fi';

const TSHIRT_IMAGE = '/images/plain_tshirt.png';

export function VirtualTShirt({
  printImage,
  printText,
  fabricColor = '#ffffff',
  textColor = '#000000',
  previewMode = false
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [activeElement, setActiveElement] = useState(null);
  const [gridSize] = useState(20);
  const [rotation, setRotation] = useState({ image: 0, text: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth: width, offsetHeight: height } = containerRef.current;
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const [imgPos, setImgPos] = useState({ x: 0.2, y: 0.1, w: 0.6 });
  const [textPos, setTextPos] = useState({ x: 0.1, y: 0.7, w: 0.8, h: 0.1 });

  const snapToGrid = (value) => Math.round(value / gridSize) * gridSize;
  const toPx = (fraction, axis) => dimensions[axis] * fraction;

  return (
    <div
      ref={containerRef}
      className={`relative ${previewMode ? 'cursor-default' : 'cursor-crosshair'}`}
      style={{
        width: previewMode ? '100%' : '600px',
        height: previewMode ? '400px' : '800px',
        backgroundColor: fabricColor,
        backgroundImage: `linear-gradient(45deg, #eee 25%, transparent 25%),
                          linear-gradient(-45deg, #eee 25%, transparent 25%),
                          linear-gradient(45deg, transparent 75%, #eee 75%),
                          linear-gradient(-45deg, transparent 75%, #eee 75%),
                          url(${TSHIRT_IMAGE})`,
        backgroundSize: `${gridSize}px ${gridSize}px, 
                         ${gridSize}px ${gridSize}px, 
                         ${gridSize}px ${gridSize}px, 
                         ${gridSize}px ${gridSize}px, 
                         contain`,
        backgroundPosition: `0 0, 0 ${gridSize / 2}px, 
                            ${gridSize / 2}px -${gridSize / 2}px, 
                            -${gridSize / 2}px 0px, 
                            center`,
        boxShadow: previewMode ? 'none' : '0 8px 32px rgba(0,0,0,0.1)',
        border: previewMode ? '1px solid #e5e7eb' : 'none'
      }}
    >
      {/* Design Surface */}
      {!previewMode && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-2 border-2 border-dashed border-blue-100/50" />
        </div>
      )}

      {/* Image overlay */}
      {printImage && dimensions.width > 0 && (
        <Rnd
          bounds="parent"
          size={{ width: toPx(imgPos.w, 'width'), height: 'auto' }}
          position={{ x: toPx(imgPos.x, 'width'), y: toPx(imgPos.y, 'height') }}
          onDragStart={() => setActiveElement('image')}
          onDragStop={(e, d) => {
            const x = snapToGrid(d.x) / dimensions.width;
            const y = snapToGrid(d.y) / dimensions.height;
            setImgPos({ ...imgPos, x, y });
          }}
          onResizeStop={(e, dir, ref, delta, pos) => {
            const w = snapToGrid(ref.offsetWidth) / dimensions.width;
            const x = snapToGrid(pos.x) / dimensions.width;
            const y = snapToGrid(pos.y) / dimensions.height;
            setImgPos({ x, y, w });
          }}
          onRotateStop={(e, rotation) => setRotation({ ...rotation, image: rotation })}
          lockAspectRatio
          enableResizing={!previewMode}
          enableRotating={!previewMode}
          rotation={rotation.image}
          style={{
            boxShadow: activeElement === 'image' ? '0 0 0 2px rgba(59,130,246,0.5)' : 'none',
            zIndex: activeElement === 'image' ? 20 : 10
          }}
        >
          <img 
            src={URL.createObjectURL(printImage)} 
            alt="Design" 
            className="w-full h-auto object-contain"
          />
          {!previewMode && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-white px-2 py-1 rounded shadow">
              {Math.round(imgPos.w * 100)}% × {Math.round(rotation.image)}°
            </div>
          )}
        </Rnd>
      )}

      {/* Text overlay */}
      {printText && dimensions.width > 0 && (
        <Rnd
          bounds="parent"
          size={{ width: toPx(textPos.w, 'width'), height: toPx(textPos.h, 'height') }}
          position={{ x: toPx(textPos.x, 'width'), y: toPx(textPos.y, 'height') }}
          onDragStart={() => setActiveElement('text')}
          onDragStop={(e, d) => {
            const x = snapToGrid(d.x) / dimensions.width;
            const y = snapToGrid(d.y) / dimensions.height;
            setTextPos({ ...textPos, x, y });
          }}
          onResizeStop={(e, dir, ref, delta, pos) => {
            const w = snapToGrid(ref.offsetWidth) / dimensions.width;
            const h = snapToGrid(ref.offsetHeight) / dimensions.height;
            const x = snapToGrid(pos.x) / dimensions.width;
            const y = snapToGrid(pos.y) / dimensions.height;
            setTextPos({ x, y, w, h });
          }}
          onRotateStop={(e, rotation) => setRotation({ ...rotation, text: rotation })}
          enableResizing={!previewMode}
          enableRotating={!previewMode}
          rotation={rotation.text}
          style={{
            boxShadow: activeElement === 'text' ? '0 0 0 2px rgba(59,130,246,0.5)' : 'none',
            zIndex: activeElement === 'text' ? 20 : 10
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              fontSize: `${toPx(textPos.h, 'height') * 0.6}px`,
              color: textColor,
              fontFamily: 'Arial, sans-serif',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-center p-2">
              {printText}
            </div>
            {!previewMode && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-white px-2 py-1 rounded shadow">
                {Math.round(textPos.w * 100)}% × {Math.round(textPos.h * 100)}% × {Math.round(rotation.text)}°
              </div>
            )}
          </div>
        </Rnd>
      )}

      {/* Toolbar for active element */}
      {!previewMode && activeElement && (
        <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded">
            <FiMove className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <FiRotateCw className="w-4 h-4" />
          </button>
          {activeElement === 'text' && (
            <button className="p-2 hover:bg-gray-100 rounded">
              <FiType className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}