import { useEffect, useState } from 'react'
import TripList from './components/TripList'
import { fetchTrips } from './trips.service'
import type { MockMode } from './trips.service'
import type { Trip } from './types'

const TripPage = () => {
  const [mode, setMode] = useState<MockMode>('success')
  const [attempt, setAttempt] = useState(0)
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)

  function resetRequestState() {
    setLoading(true)
    setError(null)
    setSelectedTrip(null)
  }

  function handleModeChange(nextMode: MockMode) {
    resetRequestState()
    setMode(nextMode)
  }

  function handleRetry() {
    resetRequestState()
    setAttempt(value => value + 1)
  }

  useEffect(() => {
    // Mỗi effect có cờ riêng; response cũ không được cập nhật giao diện.
    let ignore = false

    async function load() {
      try {
        const data = await fetchTrips(mode)
        if (!ignore) setTrips(data)
      } catch (cause) {
        if (!ignore) {
          setError(cause instanceof Error ? cause.message : 'Không thể tải chuyến xe.')
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    void load()
    return () => { ignore = true }
  }, [mode, attempt])

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
