import type { Trip } from './types.js'

export const tripsFixture: Trip[] = [
  { id: 'trip-01', operator: 'Nhà xe Bình Minh', origin: 'TP.HCM', destination: 'Đà Lạt', departureTime: '2026-10-15T07:00:00+07:00', price: 320000, availableSeats: 12 },
  { id: 'trip-02', operator: 'Nhà xe Cao Nguyên', origin: 'TP.HCM', destination: 'Đà Lạt', departureTime: '2026-10-15T09:30:00+07:00', price: 380000, availableSeats: 0 },
  { id: 'trip-03', operator: 'Nhà xe Biển Xanh', origin: 'TP.HCM', destination: 'Nha Trang', departureTime: '2026-10-15T21:00:00+07:00', price: 410000, availableSeats: 5 },
]
