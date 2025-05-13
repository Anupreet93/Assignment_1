import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ThemeContext, themes } from './Components/ThemeContext';
import { VirtualTShirt } from './Components/VirtualTShirt';
import { ImageUploader } from './Components/ImageUploader';
import { PrintTextArea } from './Components/PrintTextArea';
import { MeasurementsForm } from './Components/MeasurementsForm';
import { useHotkeys } from 'react-hotkeys-hook';
import { FiUpload, FiType, FiSliders, FiEdit3, FiRotateCw, FiZoomIn, FiZoomOut } from 'react-icons/fi';
import './App.css';

export default function App() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [activeTool, setActiveTool] = useState('upload');
  const [fabricColor, setFabricColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [zoomLevel, setZoomLevel] = useState(1);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      height: 180,
      weight: 80,
      build: 'athletic',
      printText: '',
      printImage: null,
    },
  });

  useHotkeys('alt+q', () => setThemeIndex(i => (i + 1) % themes.length));

  const onSubmit = data => console.log('Print payload:', data);
  const { printImage, printText, height, weight, build } = watch();

  return (
    <ThemeContext.Provider value={themes[themeIndex]}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Top Toolbar */}
        <div className="h-12 bg-white shadow-sm flex items-center px-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">T-Shirt Designer Pro</h1>
          <div className="flex-1" />
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
            onClick={handleSubmit(onSubmit)}
          >
            <FiEdit3 />
            <span>Export Design</span>
          </button>
        </div>

        <div className="flex-1 flex">
          {/* Left Panel */}
          <div className="w-72 bg-white shadow-lg p-4 space-y-6 border-r">
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Design Tools</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTool('upload')}
                  className={`flex-1 p-2 rounded-lg flex flex-col items-center gap-2 ${
                    activeTool === 'upload' ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <FiUpload className={`w-5 h-5 ${activeTool === 'upload' ? 'text-blue-600' : 'text-gray-600'}`} />
                  <span className={`text-sm ${activeTool === 'upload' ? 'text-blue-600' : 'text-gray-700'}`}>Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTool('text')}
                  className={`flex-1 p-2 rounded-lg flex flex-col items-center gap-2 ${
                    activeTool === 'text' ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <FiType className={`w-5 h-5 ${activeTool === 'text' ? 'text-blue-600' : 'text-gray-600'}`} />
                  <span className={`text-sm ${activeTool === 'text' ? 'text-blue-600' : 'text-gray-700'}`}>Text</span>
                </button>
              </div>
            </section>

            {activeTool === 'upload' && (
              <section>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Image Settings</h3>
                <ImageUploader control={control} name="printImage" />
              </section>
            )}

            {activeTool === 'text' && (
              <section>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Text Settings</h3>
                <PrintTextArea control={control} name="printText" />
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={e => setTextColor(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                    <span className="text-sm font-mono">{textColor}</span>
                  </div>
                </div>
              </section>
            )}

            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Fabric Settings</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fabricColor}
                    onChange={e => setFabricColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                  <span className="text-sm font-mono">{fabricColor}</span>
                </div>
              </div>
            </section>
          </div>

          {/* Center Preview */}
          <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 relative">
            <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow flex gap-2">
              <button
                className="p-2 hover:bg-gray-100 rounded"
                onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
              >
                <FiZoomIn className="w-5 h-5 text-gray-600" />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded"
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
              >
                <FiZoomOut className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <FiRotateCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="relative" style={{ transform: `scale(${zoomLevel})` }}>
              <VirtualTShirt
                printImage={printImage}
                printText={printText}
                fabricColor={fabricColor}
                textColor={textColor}
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-72 bg-white shadow-lg p-4 space-y-6 border-l">
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Measurements</h3>
              <MeasurementsForm control={control} />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Height:</span>
                  <span className="font-medium text-gray-800">{height} cm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium text-gray-800">{weight} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Build:</span>
                  <span className="font-medium text-gray-800 capitalize">{build}</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Design Preview</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="aspect-square bg-white shadow-inner">
                  <VirtualTShirt
                    printImage={printImage}
                    printText={printText}
                    fabricColor={fabricColor}
                    textColor={textColor}
                    previewMode
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}