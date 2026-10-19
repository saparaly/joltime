import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

/**
 * BASE_PATH — подпуть, по которому сайт лежит на хостинге.
 * На GitHub Pages это `/joltime/` (задаётся в .github/workflows/deploy.yml),
 * на своём домене — `/` (по умолчанию).
 */
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
})
