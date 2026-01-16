import map from '../utils/map.js';

function parseCSV(csvString) {
  const lines = csvString.trim().split('\n');
  
  if (lines.length < 2) {
    throw new Error('CSV mora imati zaglavlje i barem jedan red podataka');
  }

  const headers = lines[0].split(',').map(h => h.trim());
  
  const dataLines = lines.slice(1);

  return map(dataLines, (line) => {
    const values = line.split(',').map(v => v.trim());
    
    const record = {};
    
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      let value = values[i];
      
      if (!isNaN(value) && value !== '') {
        value = parseFloat(value);
      }
      
      record[header] = value;
    }
    
    return record;
  });
}

function addConsumptionData(records) {
  return map(records, (record) => {
    if (record.distance_km <= 0) {
      throw new Error(`Nevaljana udaljenost za vozilo ${record.vehicle_id}`);
    }

    const consumption = (record.fuel_used_liters / record.distance_km) * 100;
    
    const cost = record.fuel_used_liters * record.fuel_price_per_liter;

    return {
      ...record,
      consumption_per_100km: parseFloat(consumption.toFixed(2)),
      total_cost: parseFloat(cost.toFixed(2))
    };
  });
}

export { parseCSV, addConsumptionData };