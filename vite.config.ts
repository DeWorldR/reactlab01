import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/reactlab01/', // <-- ต้องตั้งตรงนี้
  plugins: [react()],
})
