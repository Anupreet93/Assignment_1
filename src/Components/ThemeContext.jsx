import React from 'react';

export const themes = [
  {
    name: 'Light',
    className: 'light-theme',
    colors: {
      bg: 'bg-white',
      text: 'text-gray-800',
      border: 'border-gray-300',
      inputBg: 'bg-white',
      inputBorder: 'border-gray-300',
      button: {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
      },
      card: 'bg-white shadow-md',
      icon: 'text-gray-600',
      error: {
        text: 'text-red-600',
        border: 'border-red-500',
        bg: 'bg-red-50'
      },
      focusRing: 'focus:ring-2 focus:ring-blue-500',
      shadow: 'shadow-sm'
    }
  },
  {
    name: 'Dark',
    className: 'dark-theme',
    colors: {
      bg: 'bg-gray-900',
      text: 'text-gray-100',
      border: 'border-gray-700',
      inputBg: 'bg-gray-800',
      inputBorder: 'border-gray-600',
      button: {
        primary: 'bg-yellow-500 hover:bg-yellow-600 text-gray-900',
        secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-100',
      },
      card: 'bg-gray-800 shadow-lg',
      icon: 'text-gray-300',
      error: {
        text: 'text-red-400',
        border: 'border-red-500',
        bg: 'bg-red-900/20'
      },
      focusRing: 'focus:ring-2 focus:ring-yellow-500',
      shadow: 'shadow-lg'
    }
  },
  {
    name: 'Pastel',
    className: 'pastel-theme',
    colors: {
      bg: 'bg-pink-50',
      text: 'text-pink-800',
      border: 'border-pink-200',
      inputBg: 'bg-white',
      inputBorder: 'border-pink-300',
      button: {
        primary: 'bg-pink-400 hover:bg-pink-500 text-white',
        secondary: 'bg-white hover:bg-pink-50 text-pink-700',
      },
      card: 'bg-white shadow-md',
      icon: 'text-pink-600',
      error: {
        text: 'text-pink-700',
        border: 'border-pink-400',
        bg: 'bg-pink-100'
      },
      focusRing: 'focus:ring-2 focus:ring-pink-400',
      shadow: 'shadow-md'
    }
  }
];

export const ThemeContext = React.createContext(themes[0]);

// Optional: Create a custom hook for theme access
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Add display name for better dev tools identification
ThemeContext.displayName = 'ThemeContext';