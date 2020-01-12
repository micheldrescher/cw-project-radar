import User from './../model/userModel'
import catchAsync from './../util/catchAsync'
import AppError from './../util/AppError'
import { deleteOne, updateOne, getOne, getAll } from './handlerFactory'

export { createUser, getUser, getAllUsers, updateUser, updatePassword, deleteUser }

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
    // trigger the index on users to prevent duplicates
    await User.init()
    // not that's done. create the new users
    let newUser = await User.create({
        name: req.body.name,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    // remove password from user before returning - otherwise it's a password leak
    newUser.password = undefined
    newUser.active = undefined
    newUser.__v = undefined

    res.status(201).json({
        status: 'success',
        data: {
            newUser
        }
    })
})

const updatePassword = catchAsync(async (req, res, next) => {
    // get the corresponding user
    if (!req.params.id) {
        return next(new AppError('Missing user id in request', 400))
    }

    if (!req.body.password || !req.body.passwordConfirm) {
        return next(
            new AppError('Missing password or password confirmation values in request', 400)
        )
    }

    // find the user
    req.body.id = req.params.id
    const aUser = await User.findById(req.params.id)
    console.log(aUser)
    if (!aUser) {
        return next(new AppError('Invalid user ID in request.', 400))
    }

    // update the user's password
    aUser.password = req.body.password
    aUser.passwordConfirm = req.body.passwordConfirm
    await aUser.save()

    // send response
    res.status(204).json({
        status: 'success',
        data: null
    })
})

const getUser = getOne(User)
const getAllUsers = getAll(User)

// Do NOT update passwords with this!
const updateUser = updateOne(User)
const deleteUser = deleteOne(User)
