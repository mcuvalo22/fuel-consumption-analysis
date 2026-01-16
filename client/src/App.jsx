import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import pipe from './utils/pipe.js';
import { parseCSV, addConsumptionData } from './parsers/csvParser';
import {
  groupByVehicle,
  calculateVehicleStats,
  sortByConsumption,
  filterHighConsumption,
  calculateFleetStats
} from './analysis/fuelAnalysis';

function App() {

  const [csvData, setCsvData] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileLoaded = (content) => {
    setCsvData(content);
    setError(null);
    setResults(null); 
  };

  const analyzeData = () => {
    try {
      setError(null);
      
      const analyzePipeline = pipe(
        parseCSV,
        addConsumptionData,
        groupByVehicle,
        calculateVehicleStats
      );

      const vehicleStats = analyzePipeline(csvData);
      const sortedStats = sortByConsumption(vehicleStats);
      const highConsumers = filterHighConsumption(vehicleStats, 9.0);
      const fleetStats = calculateFleetStats(vehicleStats);

        setResults({
          vehicleStats: sortedStats,
          highConsumers: highConsumers,
          fleetStats: fleetStats,
        });

      } catch (err) {
        setError(err.message);  
        console.error('Greška pri analizi:', err);
    }
  };

  return (
    <div className="app">
      <Header />
      <main style={{ padding: '40px' }}>
        <FileUpload onFileLoaded={handleFileLoaded} />

        {csvData && !results && (
          <div style={{ marginTop: '20px' }}>
            <button onClick={analyzeData}
                          style={{
                background: '#2022a5',
                color: '#fff',
                border: 'none',
                padding: '15px 40px',
                fontSize: '1.1em',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
            Pokreni Analizu</button>
          </div>
        )}

                {error && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#2c2c2c',
            borderLeft: '4px solid #f7766c',
            borderRadius: '5px',
            color: '#f7766c'
          }}>
            <strong>Greška:</strong> {error}
          </div>
        )}

        {results && (
          <div style={{
            marginTop: '30px',
            padding: '20px',
            background: '#2c2c2c',
            color: '#fff',
            borderRadius: '10px'
          }}>
            <h3>Analiza uspješna!</h3>
            <p>Analizirano vozila: {results.fleetStats.total_vehicles}</p>
            <p>Prosječna potrošnja: {results.fleetStats.avg_fleet_consumption} L/100km</p>
            <p>Ukupan trošak: €{results.fleetStats.total_cost_eur.toLocaleString()}</p>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;