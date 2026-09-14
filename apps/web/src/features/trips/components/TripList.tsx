import type { Trip } from '../types'
import TripCard from './TripCard'
import Loading from '../../../components/__shared/Loading'
import Error from '../../../components/__shared/Error'
import RetryButton from '../../../components/__shared/RetryButton'

type TripListType = {
  trips: Trip[]
  loading?: boolean
  error?: string | null
  retry: () => void
  onSelect: (trip: Trip) => void
}

const TripList = ({ trips, loading, error, retry, onSelect }: TripListType) => {
  if (loading) return <Loading />
  if (error) return <div className="space-y-2"><Error text={error} /><RetryButton onClick={retry} /></div>
  if (trips.length === 0) return <p>Chưa có chuyến nào</p>

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {trips.map(trip => <TripCard key={trip.id} trip={trip} onSelect={onSelect} />)}
    </div>
  )
}
export default TripList
