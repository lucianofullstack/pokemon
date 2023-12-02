import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
       "@": path.resolve(__dirname, "./src/assets"),
      "~@": path.resolve(__dirname, "./src/assets"),
      "%actions%" : path.resolve(__dirname, "./src/redux/actions.jsx"),
      "%store%" : path.resolve(__dirname, "./src/redux/store.jsx"),
      "%reducers%" : path.resolve(__dirname, "./src/redux/reducers.jsx"),

    },
  },
})


