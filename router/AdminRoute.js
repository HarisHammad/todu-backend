const express = require('express');
const adminRouter = express.Router()
const mainAdmin =require('../controller/AdminController')
adminRouter.route('/admin').get(mainAdmin.Admin)
adminRouter.route('/deleteUser/:id').delete(mainAdmin.DeleteUser)

module.exports =adminRouter