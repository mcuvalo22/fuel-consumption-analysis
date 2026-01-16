import map from '../utils/map';
import '../styles/StatsCards.css';

function StatsCards({ fleetStats }) {

  const cards = [
    {
      id: 1,
      label: 'Ukupno vozila',
      value: fleetStats.total_vehicles,
      color: '#667eea'
    },
    {
      id: 2,
      label: 'Ukupna kilometraža',
      value: `${fleetStats.total_distance_km.toLocaleString()} km`,
      color: '#26a69a'
    },
    {
      id: 3,
      label: 'Prosječna potrošnja',
      value: `${fleetStats.avg_fleet_consumption} l/100km`,
      color: '#ff7043'
    },
    {
      id: 4,
      label: 'Ukupan trošak',
      value: `€${fleetStats.total_cost_eur.toLocaleString()}`,
      color: '#ab47bc'
    }
  ];

  const cardElements = map(cards, (card) => (
    <div key={card.id} className="stat-card" style={{ borderLeftColor: card.color }}>
      <div className="stat-content">
        <h3>{card.label}</h3>
        <p>{card.value}</p>
      </div>
    </div>
  ));

  return (
    <div className="stats-cards">
      {cardElements}
    </div>
  );
}

export default StatsCards;