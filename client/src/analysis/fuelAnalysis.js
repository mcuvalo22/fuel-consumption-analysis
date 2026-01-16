import map from '../utils/map.js';
import reduce from '../utils/reduce.js';

function groupByVehicle(records) {
  return reduce(records, (grouped, record) => {
    const vehicleId = record.vehicle_id;
    
    if (!grouped[vehicleId]) {
      grouped[vehicleId] = [];
    }
    
    grouped[vehicleId].push(record);
    
    return grouped;
  }, {});
}

function calculateVehicleStats(groupedData) {
  const vehicleIds = Object.keys(groupedData);
  
  return map(vehicleIds, (vehicleId) => {
    const records = groupedData[vehicleId];

    const totalDistance = reduce(records, (sum, r) => sum + r.distance_km, 0);
    const totalFuel = reduce(records, (sum, r) => sum + r.fuel_used_liters, 0);
    const totalCost = reduce(records, (sum, r) => sum + r.total_cost, 0);
    
    const avgConsumption = (totalFuel / totalDistance) * 100;
    const tripCount = records.length;
    
    return {
      vehicle_id: vehicleId,
      trip_count: tripCount,
      total_distance_km: parseFloat(totalDistance.toFixed(2)),
      total_fuel_liters: parseFloat(totalFuel.toFixed(2)),
      avg_consumption_per_100km: parseFloat(avgConsumption.toFixed(2)),
      total_cost_eur: parseFloat(totalCost.toFixed(2))
    };
  });
}

function sortByConsumption(vehicleStats) {
  return [...vehicleStats].sort((a, b) => 
    a.avg_consumption_per_100km - b.avg_consumption_per_100km
  );
}

function filterHighConsumption(vehicleStats, threshold = 9.0) {
  return reduce(vehicleStats, (filtered, vehicle) => {
    if (vehicle.avg_consumption_per_100km > threshold) {
      filtered.push(vehicle);
    }
    return filtered;
  }, []);
}

function calculateFleetStats(vehicleStats) {
  const totalVehicles = vehicleStats.length;
  
  const totalDistance = reduce(vehicleStats, 
    (sum, v) => sum + v.total_distance_km, 0);
  
  const totalFuel = reduce(vehicleStats, 
    (sum, v) => sum + v.total_fuel_liters, 0);
  
  const totalCost = reduce(vehicleStats, 
    (sum, v) => sum + v.total_cost_eur, 0);
  
  const avgConsumption = (totalFuel / totalDistance) * 100;
  
  return {
    total_vehicles: totalVehicles,
    total_distance_km: parseFloat(totalDistance.toFixed(2)),
    total_fuel_liters: parseFloat(totalFuel.toFixed(2)),
    avg_fleet_consumption: parseFloat(avgConsumption.toFixed(2)),
    total_cost_eur: parseFloat(totalCost.toFixed(2))
  };
}

export {
  groupByVehicle,
  calculateVehicleStats,
  sortByConsumption,
  filterHighConsumption,
  calculateFleetStats
};