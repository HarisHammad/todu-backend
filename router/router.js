const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')
const {singupSchema,loginSchema} =require('../validate/validateZod')
const authMiddlewere = require('../middlewhere/authMiddlewere')

const validate = require('../middlewhere/validate-middlewere')

router.route('/register').post(validate(singupSchema),controller.register)
router.route('/login').post(validate(loginSchema),controller.login)
router.route('/users').get(authMiddlewere,controller.user)
router.route('/task').post(controller.task)
router.route('/users/:id').get(authMiddlewere,controller.userData)
router.route('/usersDelete/:id/:taskid').delete(controller.deleteData)
module.exports=router