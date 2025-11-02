import { ICustomer } from 'models/customer.model'
import ParkingSpot, { IParkingSpot } from '../models/parking-spot.model'

export const getFreeParkingSpots = async (): Promise<IParkingSpot[]> => {
  const freeSpots: IParkingSpot[] = await (ParkingSpot as any).find({ isOccupied: false }).lean()
  return freeSpots
}

export const getBookedSpots = async (): Promise<IParkingSpot[]> => {
  const freeSpots: IParkingSpot[] = await (ParkingSpot as any).find({ isOccupied: true }).lean()
  return freeSpots
}

// allcate parking

export const allocateParkingSpot = async (customer: ICustomer): Promise<IParkingSpot | null> => {
  const query: any = { isOccupied: false }

  if (customer.customerType === 'handicapped') {
    query.type = 'handicapped'
  } else if (customer.customerType === 'vip') {
    query.type = 'vip'
  } else if (customer.customerType === 'regular') {
    query.type = customer.vehicleType === 'compact' ? 'compact' : 'standard'
  }

  if (customer.preferredLevel) query.level = customer.preferredLevel

  let spot = await (ParkingSpot as any).findOne(query).sort({ distanceFromEntrance: 1 }).lean()

  if (!spot && customer.customerType !== 'vip' && customer.customerType !== 'handicapped') {
    const fallbackType = customer.vehicleType === 'compact' ? 'compact' : 'standard'
    let fallbackQuery: any = { isOccupied: false, type: fallbackType }
    if (customer.preferredLevel) fallbackQuery.level = customer.preferredLevel

    spot = await (ParkingSpot as any)
      .findOne(fallbackQuery)
      .sort({ distanceFromEntrance: 1 })
      .lean()
  }

  if (!spot) return null

  await (ParkingSpot as any).updateOne({ spotId: spot.spotId }, { isOccupied: true })
  return { ...spot, isOccupied: true }
}

export const releaseParkingSpot = async (spotId: number): Promise<IParkingSpot | null> => {
  const spot = await (ParkingSpot as any).findOne({ spotId })

  if (!spot) return null

  await (ParkingSpot as any).updateOne({ spotId }, { isOccupied: false })

  return { ...spot.toObject(), isOccupied: false }
}
