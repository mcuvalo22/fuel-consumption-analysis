import map from '../utils/map';
import '../styles/VehicleTable.css';

function VehicleTable({ vehicles, title }) {

  const tableRows = map(vehicles, (vehicle, index) => (
    <tr key={vehicle.vehicle_id}>
      <td>{index + 1}</td>
      <td className="vehicle-id">{vehicle.vehicle_id}</td>
      <td>{vehicle.trip_count}</td>
      <td>{vehicle.total_distance_km.toLocaleString()} km</td>
      <td className="consumption-cell">
        <span className={`consumption-badge ${getConsumptionClass(vehicle.avg_consumption_per_100km)}`}>
          {vehicle.avg_consumption_per_100km} L/100km
        </span>
      </td>
      <td>€{vehicle.total_cost_eur.toFixed(2)}</td>
    </tr>
  ));

  return (
    <div className="vehicle-table-container">
      <h3>{title}</h3>
      <div className="table-wrapper">
        <table className="vehicle-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Vozilo</th>
              <th>Broj vožnji</th>
              <th>Ukupna km</th>
              <th>Prosječna potrošnja</th>
              <th>Ukupan trošak</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getConsumptionClass(consumption) {
  if (consumption < 7) return 'excellent';
  if (consumption < 8.5) return 'good';
  if (consumption < 9.5) return 'average';
  return 'high';
}

export default VehicleTable;