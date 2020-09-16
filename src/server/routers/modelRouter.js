//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
const handler = require('../handlers/modelHandler')

const router = express.Router()

//
// ROUTES
//

/*********************/
/*                   */
/*   PUBLIC ROUTES   */
/*                   */
/*********************/
// get model data from the server
router.get('/dimensions', handler.getDimensions)

/*****************************/
/*                           */
/*   LOGGED IN USER ROUTES   */
/*                           */
/*****************************/

/*******************************/
/*                             */
/*   ADMIN RESTRICTED ROUTES   */
/*                             */
/*******************************/

//
// EXPORTS
//
module.exports = router
