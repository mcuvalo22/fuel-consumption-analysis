import fs from 'fs';

const csvContent = fs.readFileSync('./data/fuel_data.csv', 'utf-8');
const lines = csvContent.trim().split('\n');

if (lines.length < 2) {
  console.error('CSV je prazan');
  process.exit(1);
}

const headers = lines[0].split(',');
const expectedHeaders = ['vehicle_id', 'date', 'distance_km', 'fuel_used_liters', 'fuel_price_per_liter'];

console.log(`Zaglavlje: ${headers.join(', ')}`);
console.log(`Broj redaka: ${lines.length - 1}`);

const headersMatch = expectedHeaders.every((h, i) => headers[i]?.trim() === h);
if (!headersMatch) {
  console.error('Zaglavlje nije ispravno!');
  console.log(`   Očekivano: ${expectedHeaders.join(',')}`);
  console.log(`   Dobiveno:  ${headers.join(',')}`);
  process.exit(1);
}

const vehicles = new Set();
lines.slice(1).forEach(line => {
  const cols = line.split(',');
  vehicles.add(cols[0]?.trim());
});

console.log(` Broj različitih vozila: ${vehicles.size}`);