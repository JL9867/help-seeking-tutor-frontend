import React from 'react';
import Editor from '@monaco-editor/react';

const FileEditor = ({ openFiles, currentFile, content, onChange, onSelect, onClose }) => {
  return (
    <div className="file-editor">
      <div className="file-name-tabs">
        {openFiles.map((file, index) => (
          <button
            key={index}
            className={`file-name-button ${file === currentFile ? 'active' : ''}`}
            onClick={() => onSelect(file)}
          >
            {file} <span className="close-icon" onClick={(e) => { e.stopPropagation(); onClose(file); }}>X</span>
          </button>
        ))}
      </div>
      <Editor
        height="70vh"
        defaultLanguage="javascript"
        value={content}
        onChange={(ev, value) => onChange(value)}
      />
    </div>
  );
};

export default FileEditor;
