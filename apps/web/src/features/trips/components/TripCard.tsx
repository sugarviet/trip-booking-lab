import type { Trip } from '../types'

type TripCardType = {
    trip: Trip,
    onSelect: (trip: Trip) => void
}

const OUT_OF_SEAT = 0;

const TripCard = ({ trip, onSelect }: TripCardType) => {
    const { 
        operator,
        availableSeats,
        departureTime,
        destination,
        origin,
        price } = trip;

        const formatVND = new Intl.NumberFormat("vi-VN", {
            style: 'currency',
            currency: "VND"
        }).format(price);

        const formattedDepartureTime = new Intl.DateTimeFormat('vi-VN', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Asia/Ho_Chi_Minh',
          }).format(new Date(departureTime));

          const handleSelect = () => {
            onSelect(trip)
          }

    return (
        <div className='min-w-0 break-words border rounded-2xl p-4'>
            <div className='flex flex-wrap gap-x-2'>
                Từ <span className='font-bold'>{origin}</span> đến <span className='font-bold'>{destination}</span>
            </div>
            <p>Giá: <span className='font-bold'>{formatVND}</span></p>
            <p>Ghế còn lại: <span className='font-bold'>{availableSeats}</span></p>
            <p>Giờ khởi hành: <span className='font-bold'>{formattedDepartureTime}</span></p>
            <p>Nhà xe: <span className='font-bold'>{operator}</span></p>

            {availableSeats <= OUT_OF_SEAT && <button type="button" disabled className='bg-red-500 text-white px-2 py-1 rounded-2xl font-bold cursor-not-allowed'>Hết chỗ</button>}
            {availableSeats > OUT_OF_SEAT && <button type="button" className='bg-green-700 text-white px-2 py-1 rounded-2xl font-bold cursor-pointer transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-blue-700 focus-visible:outline-offset-2' onClick={handleSelect}>Chọn chuyến</button>}
        </div>
    )
}

export default TripCard