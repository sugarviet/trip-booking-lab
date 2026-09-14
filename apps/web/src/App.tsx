import TripPage from "./features/trips/TripPage";

export default function App() {
  return (
    <main>
      <span className="eyebrow">FRONTEND → FULLSTACK · LEARNING PROJECT</span>
      <h1>Trip Booking Lab</h1>
      <p>Ứng dụng tìm chuyến xe và quản lý đặt chỗ.</p>
      <section aria-labelledby="ticket-title">
        <span className="badge">TICKET FE-001</span>
        <h2 id="ticket-title">Danh sách chuyến xe</h2>
        <p>Bắt đầu với dữ liệu mẫu, component TripCard và các trạng thái loading, error, empty.</p>
        <p>Đọc yêu cầu trong <code>docs/tickets/FE-001.md</code> trước khi triển khai.</p>
        <TripPage />
      </section>
    </main>
  )
}
