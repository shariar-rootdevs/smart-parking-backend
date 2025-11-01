import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import parkingRoutes from './routes/parking.routes'

dotenv.config()

const app = express()
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/smart_parking'
const PORT = process.env.PORT || 8080

// Middlewares
app.use(cors())
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

// Routes
app.use('/parking', parkingRoutes)

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error', error))

// Route
app.get('/', (req, res) => {
  res.json({ message: 'Hi' })
})

// Create server
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log('Server running on http://localhost:8080/')
})
