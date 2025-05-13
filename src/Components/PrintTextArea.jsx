import React from 'react';
import { Controller } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi';

export function PrintTextArea({ control, name }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ validate: text => text.split('\n').length <= 3 || 'Max 3 lines' }}
      render={({ field, fieldState }) => {
        const lineCount = field.value?.split('\n').length || 0;
        
        return (
          <div className="space-y-1.5">
            <div className={`relative border rounded-lg transition-all duration-200
              ${fieldState.error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400 focus-within:border-blue-500'}
            `}>
              <textarea
                {...field}
                rows={3}
                placeholder="Enter your custom text here...\n\n(Up to 3 lines)"
                className={`w-full px-4 py-3 rounded-lg bg-transparent focus:outline-none 
                  placeholder-gray-400 resize-none ${fieldState.error ? 'pr-10' : ''}`}
              />
              
              {fieldState.error && (
                <div className="absolute top-3 right-3 text-red-500">
                  <FiAlertCircle className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="flex justify-between items-start px-1">
              {fieldState.error ? (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <span>Lines: {lineCount}/3</span>
                  <span className="font-medium">•</span>
                  <span>{fieldState.error.message}</span>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">
                  {lineCount > 0 ? `${3 - lineCount} lines remaining` : 'Supports multi-line text'}
                </div>
              )}
              
              {!fieldState.error && (
                <span className="text-sm text-gray-400">
                  {lineCount}/3
                </span>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}