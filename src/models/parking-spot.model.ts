import mongoose, { Document, Schema, model } from 'mongoose'

export interface IParkingSpot extends Document {
  spotId: number
  level: 1 | 2 | 3
  type: 'compact' | 'standard' | 'handicapped' | 'vip'
  distanceFromEntrance: number
  isOccupied: boolean
}

const parkingSpotSchema = new Schema<IParkingSpot>(
  {
    spotId: {
      type: Number,
      required: true,
      unique: true,
    },
    level: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
    },
    type: {
      type: String,
      enum: ['compact', 'standard', 'handicapped', 'vip'],
      required: true,
      trim: true,
    },
    distanceFromEntrance: {
      type: Number,
      required: true,
      min: 0,
    },
    isOccupied: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const ParkingSpot =
  mongoose.models.ParkingSpot || model<IParkingSpot>('ParkingSpot', parkingSpotSchema)

export default ParkingSpot
