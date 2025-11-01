import dotenv from 'dotenv'
import mongoose from 'mongoose'
import ParkingSpot from './models/parking-spot.model'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/smart_parking'

const seedParkingSpots = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    await (ParkingSpot as any).deleteMany({})

    const totalSpots = 200
    const spotsPerLevel = Math.floor(totalSpots / 3)
    const parkingSpots = []

    for (let i = 1; i <= totalSpots; i++) {
      const level = i <= spotsPerLevel ? 1 : i <= 2 * spotsPerLevel ? 2 : 3

      let type: 'compact' | 'standard' | 'handicapped' | 'vip' = 'standard'
      if (i <= 30) type = 'handicapped'
      else if (i <= 60) type = 'vip'
      else if (i % 3 === 0) type = 'compact'

      const distanceFromEntrance = 3 + i * 0.5

      parkingSpots.push({
        spotId: i,
        level,
        type,
        distanceFromEntrance,
        isOccupied: false,
      })
    }

    await ParkingSpot.insertMany(parkingSpots)
    console.log(`Seeded ${parkingSpots.length} parking spots successfully!`)
  } catch (error) {
    console.error('Seeding error:', error)
  } finally {
    mongoose.disconnect()
    console.log('MongoDB connection closed')
  }
}

seedParkingSpots()
