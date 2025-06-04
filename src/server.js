import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import router from './router/routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', router)

app.listen(PORT, () => console.log(`Listening on port ${PORT} at http://localhost:${PORT}`))