import { Request, Response } from 'express'
import { ICustomer } from 'models/customer.model'
import {
  allocateParkingSpot,
  getBookedSpots,
  getFreeParkingSpots,
  releaseParkingSpot,
} from '../services/parking.services'

export const parkingStatus = async (req: Request, res: Response) => {
  try {
    const freeSpots = await getFreeParkingSpots()
    res.json({
      totalFree: freeSpots.length,
      freeSpots,
    })
  } catch (error) {
    console.error('Error fetching parking status:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const bookedStatus = async (req: Request, res: Response) => {
  try {
    const booked = await getBookedSpots()
    res.json({
      totalBooked: booked.length,
      booked,
    })
  } catch (error) {
    console.error('Error fetching booked parking status:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const allocateParking = async (req: Request, res: Response) => {
  try {
    const customer: ICustomer = req.body

    const allocatedSpot = await allocateParkingSpot(customer)

    if (!allocatedSpot) {
      return res.status(404).json({ message: 'No parking spot available' })
    }

    return res.status(200).json({
      message: 'Parking spot allocated successfully',
      spot: allocatedSpot,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const releaseParking = async (req: Request, res: Response) => {
  try {
    const spotId = parseInt(req.params.id)
    if (isNaN(spotId)) {
      return res.status(400).json({ message: 'Invalid parking spot ID' })
    }

    const releasedSpot = await releaseParkingSpot(spotId)

    if (!releasedSpot) {
      return res.status(404).json({ message: 'Parking spot not found' })
    }

    return res.status(200).json({
      message: 'Parking spot released successfully',
      spot: releasedSpot,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}
