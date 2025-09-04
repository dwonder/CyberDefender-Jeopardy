import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this line, replacing 'your-repo-name' with your repository's name
  base: '/CyberDefender-Jeopardy/', 
});