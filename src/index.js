import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pipe from './utils/pipe.js';
import { parseCSV, addConsumptionData } from './parsers/csvParser.js';
import {
  groupByVehicle,
  calculateVehicleStats,
  sortByConsumption,
  filterHighConsumption,
  calculateFleetStats
} from './analysis/fuelAnalysis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadCSV(filename) {
  const filePath = path.join(__dirname, '..', 'data', filename);
  
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(` Greška pri učitavanju datoteke: ${error.message}`);
    process.exit(1);
  }
}

function displayResults(vehicleStats, fleetStats, highConsumers) {
  console.log('\n' + '═'.repeat(60));
  console.log('  ANALIZA POTROŠNJE GORIVA - VOZNI PARK');
  console.log('═'.repeat(60));
  
  console.log('\n UKUPNA STATISTIKA');
  console.log('─'.repeat(60));
  console.log(`Ukupno vozila:              ${fleetStats.total_vehicles}`);
  console.log(`Ukupna kilometraža:         ${fleetStats.total_distance_km.toLocaleString()} km`);
  console.log(`Ukupno gorivo:              ${fleetStats.total_fuel_liters.toLocaleString()} L`);
  console.log(`Prosječna potrošnja:        ${fleetStats.avg_fleet_consumption} L/100km`);
  console.log(`Ukupan trošak goriva:       €${fleetStats.total_cost_eur.toLocaleString()}`);
  
  console.log('\n TOP 5 NAJEKONOMIČNIJIH VOZILA');
  console.log('─'.repeat(60));
  const top5 = vehicleStats.slice(0, 5);
  top5.forEach((vehicle, index) => {
    console.log(
      `${index + 1}. ${vehicle.vehicle_id.padEnd(15)} ` +
      `${vehicle.avg_consumption_per_100km.toFixed(1)} L/100km  ` +
      `€${vehicle.total_cost_eur.toFixed(2)}`
    );
  });
  
  if (highConsumers.length > 0) {
    console.log('\n VOZILA S VISOKOM POTROŠNJOM (>9 L/100km)');
    console.log('─'.repeat(60));
    highConsumers.forEach((vehicle) => {
      console.log(
        `${vehicle.vehicle_id.padEnd(15)} ` +
        `${vehicle.avg_consumption_per_100km.toFixed(1)} L/100km  ` +
        `€${vehicle.total_cost_eur.toFixed(2)}`
      );
    });
  } else {
    console.log('\n Nema vozila s visokom potrošnjom');
  }
  
  console.log('\n' + '═'.repeat(60) + '\n');
}

function main() {
  const csvData = loadCSV('fuel_data.csv');
  
  const analyzeData = pipe(
    parseCSV,
    addConsumptionData,
    groupByVehicle,
    calculateVehicleStats  
  );
  
  const vehicleStats = analyzeData(csvData);
  
  const sortedStats = sortByConsumption(vehicleStats);
  const highConsumers = filterHighConsumption(sortedStats, 9.0);
  const fleetStats = calculateFleetStats(vehicleStats);
  
  displayResults(sortedStats, fleetStats, highConsumers);
}

main();