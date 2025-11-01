import mongoose, { Document, Schema, model } from 'mongoose'

export interface ICustomer extends Document {
  vehicleType: 'compact' | 'standard' | 'suv'
  customerType: 'regular' | 'vip' | 'handicapped'
  preferredLevel?: number
}

const customerSchema = new Schema<ICustomer>(
  {
    vehicleType: {
      type: String,
      enum: ['compact', 'standard', 'suv'],
      required: true,
      trim: true,
    },
    customerType: {
      type: String,
      enum: ['regular', 'vip', 'handicapped'],
      required: true,
      trim: true,
    },
    preferredLevel: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Customer = mongoose.models.Customer || model<ICustomer>('Customer', customerSchema)

export default Customer
