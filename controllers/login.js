var dbService=require('../services/db_services')
const user_signIn = require('../models/User');

module.exports={
    async signin_user(req,res){
        var user_obj=new user_signIn();
        user_obj=req.body;
        
        dbService.user_signin(user_obj).then(valid=>{
            if(valid){
                console.log("User Sign-In Error")
                res.json({
                    "msg":" User Sign-In Error"
                })
            }else{
                console.log("No User Sign-In Error")
            res.json({
                "msg":"No User Sign-In Error"
            })
            }
            
        }).catch(err=>{
            console.log("User Sign-In Error")
            res.json({
                "msg":" User Sign-In Error"
            })
        })

        
    },

    async signup_user(req,res){
        var user_obj=new user_signIn();
        user_obj=req.body;

        
    }
}