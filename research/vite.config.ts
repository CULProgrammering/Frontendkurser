import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { readdirSync, readFileSync, copyFileSync, mkdirSync, existsSync } from 'fs'

function serveMarkdown() {
  const root = resolve(__dirname)
  return {
    name: 'serve-markdown',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url?.endsWith('.md')) {
          const filePath = resolve(root, req.url.slice(1))
          if (existsSync(filePath)) {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.end(readFileSync(filePath, 'utf-8'))
            return
          }
        }
        next()
      })
    },
    buildStart() {
      // Copy .md files into public/ for production build
      const pubDir = resolve(root, 'public')
      if (!existsSync(pubDir)) mkdirSync(pubDir)
      for (const file of readdirSync(root)) {
        if (file.endsWith('.md') && file !== 'README.md') {
          copyFileSync(resolve(root, file), resolve(pubDir, file))
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [serveMarkdown(), react()],
})
