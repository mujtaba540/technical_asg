var {Router}=require('express')
var controller=require('../controllers/login')

var router=Router()

router.post('/login/user',controller.signin_user)

module.exports=router