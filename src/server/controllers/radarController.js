import Radar from './../model/radarModel'
import catchAsync from './../util/catchAsync'
import { deleteOne, updateOne, getOne, createOne, getAll } from './handlerFactory'

export { getAllRadars, createRadar, getRadarList, getRadar, updateRadar, deleteRadar }

const getRadar = getOne(Radar)
const getAllRadars = getAll(Radar)
const createRadar = createOne(Radar)

// Do NOT update passwords with this!
const updateRadar = updateOne(Radar)
const deleteRadar = deleteOne(Radar)

const getRadarList = catchAsync(async (req, res, next) => {
    res.status(501).json({
        status: 'error',
        message: 'Getting a list of radars has not been implemented yet'
    })
})
