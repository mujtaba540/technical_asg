var Joi=require('joi')
var bcrypt=require('bcrypt')
var date=require('date-and-time')



const signUp=Joi.object().keys({
    Username:Joi.string().trim().email().required(),
    Password:Joi.string().required()
})

const signIn=Joi.object().keys({
    FirstName:Joi.string().required(),
    LastName:Joi.string().required(),
    Username:Joi.string().trim().email().required(),
    Password:Joi.string().required(),
    PhoneNumber:Joi.string().required(),
    Address:Joi.string().allow('').optional()

})
const rounds=10;
var now=new Date();
module.exports={
   async valid_signin(user){
    return signUp.validate(user);
    },

    async valid_signup(user){
        return signIn.validate(user)
    },

    async ecrypt_pwd(pwd){
        return bcrypt.hash(pwd,rounds);
    },

    async decrypt_pwd(pwd,db_pwd){
        return bcrypt.compare(pwd,db_pwd)
    },

    set_user(user){
        user.IsActive="true"
        user.IsDeleted="false"
        user.CreatedBy="Mujtaba"
        user.CreatedOn=date.format(now,"YYYY/MM/DD HH:mm:ss")
        user.UpdatedBy=""
        user.UpdatedOn=""
        return user
    }
}