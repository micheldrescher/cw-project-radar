//
// IMPORTS
//
// app modules
const APIFeatures = require('../utils/apiFeatures')

exports.createOne = async (Model, data) => await Model.create(data)

exports.getOne = async (Model, id, popOptions) => {
    let query = Model.findById(id)
    if (popOptions) query = query.populate(popOptions)
    return await query
}

exports.getAll = async (Model, query) =>
    await new APIFeatures(Model.find({}), query).filter().sort().limitFields().paginate().query

exports.updateOne = async (Model, id, data) =>
    await Model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    })

exports.deleteOne = async (Model, id) => await Model.findByIdAndDelete(id)
