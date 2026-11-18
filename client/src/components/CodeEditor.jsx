import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({
  language = 'javascript',
  value = '',
  onChange,
  onRun,
  theme = 'vs-dark',
  height = '450px'
}) => {
  // Handle text changes in the editor
  function handleEditorChange(newValue) {
    if (onChange) {
      onChange(newValue);
    }
  }

  return (
    <div className="flex flex-col rounded-xl border border-gray-700 bg-gray-900 shadow-2xl overflow-hidden">
      {/* Editor Header / Toolbar */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          {/* Window control dots */}
          <span className="h-3 w-3 rounded-full bg-red-500 inline-block"></span>
          <span className="h-3 w-3 rounded-full bg-yellow-500 inline-block"></span>
          <span className="h-3 w-3 rounded-full bg-green-500 inline-block"></span>
          
          <span className="text-xs font-bold text-gray-300 ml-3 uppercase tracking-wider bg-gray-700 px-2.5 py-1 rounded">
            {language}
          </span>
        </div>
        
        {/* Run Code Action Button */}
        {onRun && (
          <button
            onClick={onRun}
            className="flex items-center space-x-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span>Run Code</span>
          </button>
        )}
      </div>

      {/* Monaco Editor Component Container */}
      <div className="w-full" style={{ height: height }}>
        <Editor
          height="100%"
          language={language}
          theme={theme}
          value={value}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false }, // Cleaner look for students
            fontSize: 14,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            padding: { top: 16 },
            fontFamily: "'Fira Code', 'Courier New', Courier, monospace",
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;