import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import TripCard from './TripCard'
import { tripsFixture } from '../trips.fixture'

describe('TripCard', () => {
  it('không cho chọn chuyến hết ghế', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<TripCard trip={{ ...tripsFixture[0], availableSeats: 0 }} onSelect={onSelect} />)
    const button = screen.getByRole('button', { name: 'Hết chỗ' })
    expect(button).toBeDisabled()
    await user.click(button)
    expect(onSelect).not.toHaveBeenCalled()
  })
  it('hiển thị thông tin chuyến', () => {
    render(<TripCard trip={tripsFixture[0]} onSelect={vi.fn()} />)
    expect(screen.getByText('Nhà xe Bình Minh')).toBeInTheDocument()
    expect(screen.getByText('TP.HCM')).toBeInTheDocument()
    expect(screen.getByText('Đà Lạt')).toBeInTheDocument()
    expect(screen.getByText(/320\.000/)).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText(/07:00/)).toBeInTheDocument()
  })
  it('gửi đúng chuyến khi chọn', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<TripCard trip={tripsFixture[0]} onSelect={onSelect} />)
    await user.click(screen.getByRole('button', { name: 'Chọn chuyến' }))
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(tripsFixture[0])
  })
})
