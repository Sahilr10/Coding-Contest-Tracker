import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'https://coding-contest-tracker-backend.onrender.com',
          changeOrigin: true
        }
      }
    },
    define: {
      // Make environment variables available globally
      __VITE_API_URL__: JSON.stringify(env.VITE_API_URL || 'https://coding-contest-tracker-backend.onrender.com/api/v1')
    }
  }
})
