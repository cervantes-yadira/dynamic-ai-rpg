import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3002
const BASE_URL = process.env.BASE_URL + PORT
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self'; img-src 'self' ${BASE_URL}`
  )
  next()
})

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/home', (req, res) => {
    res.status(200).json({
        message: 'This is the home page'
    })
})

app.listen(PORT, () => console.log(`Listening on port ${PORT} at ${BASE_URL}`))