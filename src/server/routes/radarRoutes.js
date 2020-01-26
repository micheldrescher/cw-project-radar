import express from 'express'
import {
    getAllRadars,
    createRadar,
    getRadarList,
    getRadar,
    updateRadar,
    deleteRadar
} from './../controllers/radarController'
import { restrictTo, protect } from './../controllers/authController'

export { router as default }

const router = express.Router()

router
    .route('/')
    .get(getAllRadars)
    .post(protect, restrictTo('admin'), createRadar)

router.route('/list').get(getRadarList)

router
    .route('/:id')
    .get(getRadar)
    .patch(protect, restrictTo('admin'), updateRadar)
    .delete(protect, restrictTo('admin'), deleteRadar)
