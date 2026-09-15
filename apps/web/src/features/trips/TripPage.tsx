import { useEffect, useState } from 'react'
import TripList from './components/TripList'
import type { MockMode } from './trips.service'
import type { Trip } from './types'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchTripsRequested } from './trips.slice'

const TripPage = () => {
  const dispatch = useAppDispatch();

  const {data: trips, loading, error} = useAppSelector(state => state.trips)


  const [mode, setMode] = useState<MockMode>('success')
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)

  useEffect(() => {
    dispatch(fetchTripsRequested({ mode }))
  }, [dispatch, mode])


  function handleModeChange(nextMode: MockMode) {
    setSelectedTrip(null)
    setMode(nextMode)
  }

  function handleRetry() {
    setSelectedTrip(null)
    dispatch(fetchTripsRequested({mode}))
  }

  return (
    <div className="mt-6 space-y-4">
      <div>
        <label htmlFor="mock-mode" className="mb-1 block font-medium">Chế độ dữ liệu mẫu</label>
        <select id="mock-mode" value={mode}
          onChange={event => handleModeChange(event.target.value as MockMode)}
          className="max-w-full rounded-lg border bg-white p-2 focus-visible:outline-2 focus-visible:outline-blue-700">
          <option value="success">Thành công</option>
          <option value="error">Lỗi</option>
          <option value="empty">Danh sách rỗng</option>
        </select>
        <p className="text-sm text-slate-600">Mô phỏng trễ 600 ms. Chế độ Lỗi luôn lỗi; chọn Thành công để mô phỏng phục hồi.</p>
      </div>
      <TripList trips={trips} loading={loading} error={error}
        retry={handleRetry} onSelect={setSelectedTrip} />
      {selectedTrip && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-emerald-900">
        Đã chọn: {selectedTrip.operator} — {selectedTrip.origin} → {selectedTrip.destination}
      </p>}
    </div>
  )
}
export default TripPage
