import User from './../model/userModel'
import catchAsync from './../util/catchAsync'
import { deleteOne, updateOne, getOne, getAll } from './handlerFactory'
import { createSendToken } from './authController'

export { createUser, getUser, getAllUsers, updateUser, deleteUser }

// const filterObj = (obj, ...allowedFields) => {
//     const newObj = {}
//     Object.keys(obj).forEach(el => {
//         if (allowedFields.includes(el)) newObj[el] = obj[el]
//     })
//     return newObj
// }

// exports.getMe = (req, res, next) => {
//     req.params.id = req.user.id
//     next()
// }

// exports.updateMe = catchAsync(async (req, res, next) => {
//     // 1) Create error if user POSTs password data
//     if (req.body.password || req.body.passwordConfirm) {
//         return next(
//             new AppError(
//                 'This route is not for password updates. Please use /updateMyPassword.',
//                 400
//             )
//         )
//     }

//     // 2) Filtered out unwanted fields names that are not allowed to be updated
//     const filteredBody = filterObj(req.body, 'name', 'email')
//     if (req.file) filteredBody.photo = req.file.filename

//     // 3) Update user document
//     const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
//         new: true,
//         runValidators: true
//     })

//     res.status(200).json({
//         status: 'success',
//         data: {
//             user: updatedUser
//         }
//     })
// })

// exports.deleteMe = catchAsync(async (req, res, next) => {
//     await User.findByIdAndUpdate(req.user.id, { active: false })

//     res.status(204).json({
//         status: 'success',
//         data: null
//     })
// })

const createUser = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })

    res.status(201).json({
        status: 'success',
        data: {
            newUser
        }
    })
})

const getUser = getOne(User)
const getAllUsers = getAll(User)

// Do NOT update passwords with this!
const updateUser = updateOne(User)
const deleteUser = deleteOne(User)
