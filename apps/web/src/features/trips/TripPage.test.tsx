import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, it, vi } from 'vitest'
import TripPage from './TripPage'
import { fetchTrips } from './trips.service'
import { tripsFixture } from './trips.fixture'
import type { Trip } from './types'

vi.mock('./trips.service', () => ({ fetchTrips: vi.fn() }))
const fetchMock = vi.mocked(fetchTrips)
beforeEach(() => fetchMock.mockReset())

it('hiển thị loading rồi dữ liệu, và chuyến đã chọn', async () => {
  let resolve!: (trips: Trip[]) => void
  fetchMock.mockReturnValue(new Promise(r => { resolve = r }))
  const user = userEvent.setup()
  render(<TripPage />)
  expect(screen.getByRole('status')).toHaveTextContent('Đang tải')
  await act(async () => resolve(tripsFixture))
  await user.click(screen.getAllByRole('button', { name: 'Chọn chuyến' })[0])
  expect(screen.getByRole('status')).toHaveTextContent('Đã chọn: Nhà xe Bình Minh')
})

it('xóa lỗi khi thử lại và hiển thị kết quả thành công', async () => {
  let resolve!: (trips: Trip[]) => void
  fetchMock.mockRejectedValueOnce(new Error('Mất kết nối'))
    .mockImplementationOnce(() => new Promise(r => { resolve = r }))
  const user = userEvent.setup()
  render(<TripPage />)
  expect(await screen.findByRole('alert')).toHaveTextContent('Mất kết nối')
  await user.click(screen.getByRole('button', { name: 'Thử lại' }))
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  expect(screen.getByRole('status')).toHaveTextContent('Đang tải')
  await act(async () => resolve(tripsFixture))
  expect(await screen.findByText('Nhà xe Bình Minh')).toBeInTheDocument()
})

it('hiển thị trạng thái rỗng', async () => {
  fetchMock.mockResolvedValue([])
  render(<TripPage />)
  expect(await screen.findByText('Chưa có chuyến nào')).toBeInTheDocument()
})

it('bỏ qua response cũ khi đổi chế độ', async () => {
  let resolveOld!: (trips: Trip[]) => void
  fetchMock.mockImplementationOnce(() => new Promise(r => { resolveOld = r }))
    .mockResolvedValueOnce([])
  const user = userEvent.setup()
  render(<TripPage />)
  await user.selectOptions(screen.getByLabelText('Chế độ dữ liệu mẫu'), 'empty')
  expect(await screen.findByText('Chưa có chuyến nào')).toBeInTheDocument()
  await act(async () => resolveOld(tripsFixture))
  expect(screen.queryByText('Nhà xe Bình Minh')).not.toBeInTheDocument()
  expect(screen.getByText('Chưa có chuyến nào')).toBeInTheDocument()
})

it('kiểm tra khi đổi chế độ thành chưa có chuyến nào', async() => {
  let resolve!: (trips: Trip[]) => void
  fetchMock.mockReturnValue(new Promise(r => { resolve = r }))
  const user = userEvent.setup()

  render(<TripPage />)
  expect(screen.getByRole('status')).toHaveTextContent('Đang tải')
  await act(async () => resolve(tripsFixture))
  await user.click(screen.getAllByRole('button', { name: 'Chọn chuyến' })[0])
  expect(screen.getByRole('status')).toHaveTextContent('Đã chọn: Nhà xe Bình Minh')

  fetchMock.mockResolvedValue([])
  await user.selectOptions(screen.getByLabelText('Chế độ dữ liệu mẫu'), 'empty')

  expect(
    await screen.findByText('Chưa có chuyến nào')
  ).toBeInTheDocument()

  expect(
    screen.queryByText(/Đã chọn:/)
  ).not.toBeInTheDocument()
})