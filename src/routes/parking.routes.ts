import { Router } from 'express'
import { allocateParking, parkingStatus, releaseParking } from '../controllers/parking.controller'

const router = Router()

router.get('/status', parkingStatus)

router.post('/allocate', allocateParking)
router.put('/:id/release', releaseParking)

export default router
