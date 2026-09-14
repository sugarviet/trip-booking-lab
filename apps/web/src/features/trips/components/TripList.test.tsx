import { render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { tripsFixture } from '../trips.fixture'
import TripList from './TripList'

it('hiển thị tất cả chuyến', () => {
  render(<TripList trips={tripsFixture} retry={vi.fn()} onSelect={vi.fn()} />)
  for (const trip of tripsFixture) expect(screen.getByText(trip.operator)).toBeInTheDocument()
})
