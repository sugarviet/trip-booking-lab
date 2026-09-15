import express from 'express';
import { tripsRouter } from './trips/trips.routes.js';

const app = express();
const port = Number(process.env.PORT ?? 3001);
app.use(express.json());
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'trip-booking-api' });
});
// API ROUTES
app.use('/api/trips', tripsRouter)

app.use((_req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});
app.listen(port, '127.0.0.1', () => {
  console.log(`API ready at http://127.0.0.1:${port}`);
});
