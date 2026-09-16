import dotenv from 'dotenv'
import { Pool } from 'pg'

// Đọc apps/api/.env ở cả lúc chạy src và sau khi build thành dist.
dotenv.config({
  path: new URL('../.env', import.meta.url),
})

export const pool = new Pool({
  connectionTimeoutMillis: 5000,
})

pool.on('error', error => {
  console.error('Lỗi kết nối PostgreSQL đang rảnh:', error.message)
})