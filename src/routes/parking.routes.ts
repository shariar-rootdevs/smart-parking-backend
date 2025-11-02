import { Router } from 'express'
import {
  allocateParking,
  bookedStatus,
  parkingStatus,
  releaseParking,
} from '../controllers/parking.controller'

const router = Router()

router.get('/status', parkingStatus)
router.get('/booked/status', bookedStatus)

router.post('/allocate', allocateParking)
router.put('/:id/release', releaseParking)

export default router
