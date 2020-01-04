import express from 'express'
import { ping, foo } from './../controllers/pingController'

export { pingRouter as default }

const pingRouter = express.Router()

// pingRouter.get('/', function(req, res) {
//     res.status(200).json({
//         status: 'success',
//         data: 'pong'
//     })
// })
pingRouter.get('/p', ping)
pingRouter.get('/f', foo)

// userRouter
//     .route('/:id')
//     .get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(userController.deleteUser)
