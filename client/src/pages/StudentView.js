import React, { useState } from 'react';
import API from '../services/api';
import CodeEditor from '../components/CodeEditor';

const StudentView = () => {
  const [code, setCode] = useState('console.log("Hello via Axios!");');
  const [output, setOutput] = useState('');

  const handleRunCode = async () => {
    setOutput('Running code...');
    try {
      // Clean POST request using our central API service
      const response = await API.post('/code/run', { 
        code, 
        language: 'javascript' 
      });
      setOutput(response.data.output);
    } catch (err) {
      setOutput(err.response?.data?.error || 'Error connecting to execution server.');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Interactive Coding Sandbox</h1>
      
      <CodeEditor
        language="javascript"
        value={code}
        onChange={(newCode) => setCode(newCode)}
        onRun={handleRunCode}
        height="400px"
      />

      <div className="bg-black border border-gray-800 rounded-xl p-4 font-mono text-sm text-green-400">
        <div className="text-gray-500 uppercase text-xs font-semibold mb-2">Console Output:</div>
        <pre className="whitespace-pre-wrap">{output || 'Click "Run Code" to test your script.'}</pre>
      </div>
    </div>
  );
};

export default StudentView;