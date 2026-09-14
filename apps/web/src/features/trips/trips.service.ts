import { tripsFixture } from './trips.fixture'
import type { Trip } from './types'

export type MockMode = 'success' | 'error' | 'empty'

// Mock phục vụ bài luyện, không gọi server thật.
export async function fetchTrips(mode: MockMode): Promise<Trip[]> {
  await new Promise(resolve => setTimeout(resolve, 600))
  if (mode === 'error') throw new Error('Không thể tải chuyến xe. Vui lòng thử lại.')
  return mode === 'empty' ? [] : tripsFixture.map(trip => ({ ...trip }))
}
