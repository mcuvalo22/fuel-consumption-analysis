import { useState } from 'react';
import '../styles/FileUpload.css';

function FileUpload({ onFileLoaded }) {
  const [dragActive, setDragActive] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.name.endsWith('.csv')) {
      alert('Molimo odaberite CSV datoteku!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvContent = e.target.result;
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2)
      });
      onFileLoaded(csvContent);
    };
    reader.readAsText(file);
  };

  return (
    <div className="file-upload-section">
      <h2>1. Učitaj CSV podatke</h2>
      
      <div 
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="csvFile"
          accept=".csv"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="csvFile" className="upload-label">
          <span className="upload-text">
            Klikni ili privuci datoteku za upload
          </span>
        </label>
      </div>

      {fileInfo && (
        <div className="file-info">
          <strong> Datoteka učitana:</strong> {fileInfo.name} ({fileInfo.size} KB)
        </div>
      )}
    </div>
  );
}

export default FileUpload;