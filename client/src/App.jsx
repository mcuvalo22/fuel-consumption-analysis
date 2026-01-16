import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';

function App() {

  const [csvData, setCsvData] = useState(null);

  const handleFileLoaded = (content) => {
    setCsvData(content);
    console.log('CSV ucitan:', content);
  };

  return (
    <div className="app">
      <Header />
      <main style={{ padding: '20px' }}>
        <FileUpload onFileLoaded={handleFileLoaded} />
      </main>
    </div>
  );
}

export default App;