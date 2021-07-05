var {Router}=require('express')
var controller=require('../controllers/login')

var router=Router()

router.post('/login/signin',controller.signin_user)
router.post('/login/signup',controller.signup_user)

module.exports=router