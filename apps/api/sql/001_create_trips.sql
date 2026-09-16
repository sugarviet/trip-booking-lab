CREATE TABLE trips (
  id TEXT PRIMARY KEY,
  operator TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  departure_time TIMESTAMPTZ NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0),
  available_seats INTEGER NOT NULL CHECK (available_seats >= 0)
);