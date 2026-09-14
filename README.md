# Trip Booking Lab

Project thực hành phỏng vấn React/Node.js theo JD Vexere. Dữ liệu và ứng dụng phục vụ học tập, không phải sản phẩm của Vexere.

## Chạy trên máy hiện tại

```bash
cd /home/sugarviet/Workspace/trip-booking-lab
bash scripts/npm.sh install
bash scripts/npm.sh run dev
```

Web: http://127.0.0.1:5173 · API: http://127.0.0.1:3001/api/health

Máy mặc định Node 18; script ưu tiên Node tương thích trên PATH, nếu chưa có sẽ dùng Node 24 được bundle sẵn với Codex. Không thay đổi Node toàn hệ thống. Trên máy khác cài Node 24 (xem .nvmrc), sau đó dùng npm thông thường.

## Kiểm tra

```bash
bash scripts/npm.sh run build
bash scripts/npm.sh run check
bash scripts/npm.sh test
```

Test runner đã được cấu hình nhưng chưa có test nghiệp vụ. Lệnh test hiện cho phép chưa có test; ticket QA-001 sẽ bổ sung test và bỏ tùy chọn này.

## Cấu trúc

- apps/web: React + TypeScript + Vite; Redux Toolkit, Saga, Reselect; Vitest/Testing Library.
- apps/api: Express + TypeScript; hiện chỉ có health endpoint.
- docs/tickets/FE-001.md: ticket đầu tiên dành cho bạn.
- docs/ROADMAP.md: các milestone.

Redux-Saga đã nối vào store, chưa có watcher nghiệp vụ. Dữ liệu mẫu có sẵn, chưa có lời giải FE-001. PostgreSQL, Redis, Elasticsearch sẽ được thêm ở ticket tương ứng; chưa cần chạy database để mở project.

## Git

Môi trường khởi tạo chặn ghi thư mục .git. Để bắt đầu quản lý phiên bản, chạy `git init -b main` từ terminal của bạn trong thư mục project.

## Tailwind CSS

Frontend dùng Tailwind qua plugin @tailwindcss/vite. CSS entry là apps/web/src/index.css; cấu hình cơ bản không cần tailwind.config.js hay PostCSS riêng.

Dùng trực tiếp trong JSX: `<div className="rounded-xl bg-white p-6 shadow-sm">Nội dung</div>`. Viết đầy đủ class (ví dụ `text-red-600`), tránh nối chuỗi như `text-${color}-600`. CSS giao diện mẫu nằm trong layer base để utilities có thể ghi đè.

Nếu dev server đang chạy trước lúc cài, dừng và chạy lại `bash scripts/npm.sh run dev`.
