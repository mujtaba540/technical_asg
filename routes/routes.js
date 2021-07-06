var {Router}=require('express')
var controller=require('../controllers/login')
var rest=require('../controllers/rest')

var router=Router()

router.post('/login/signin',controller.signin_user)
router.post('/login/signup',controller.signup_user)


router.post('/rest/add',rest.getToken,rest.addEmp)
router.patch('/rest/delete',rest.getToken,rest.deleteEmp)
router.put('/rest/update',rest.getToken,rest.updateEmp)

router.get('/rest/all',rest.getToken,rest.getAllEmp)
router.get('/rest/empID',rest.getToken,rest.getEmpId)
module.exports=router