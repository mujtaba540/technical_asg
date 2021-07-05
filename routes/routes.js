var {Router}=require('express')
var controller=require('../controllers/login')
var rest=require('../controllers/rest')

var router=Router()

router.post('/login/signin',controller.signin_user)
router.post('/login/signup',controller.signup_user)


router.post('/rest/add',rest.getToken,rest.add)
module.exports=router