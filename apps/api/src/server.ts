import express from 'express';
import { tripsRouter } from './trips/trips.routes.js';
import type { ErrorRequestHandler } from 'express'

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
const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  console.error(error)
  res.status(500).json({
    message: 'Có lỗi hệ thống. Vui lòng thử lại.',
  })
}

app.use(errorHandler)
app.listen(port, '127.0.0.1', () => {
  console.log(`API ready at http://127.0.0.1:${port}`);
});
