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

const emp_valid=Joi.object().keys({
    UserID:Joi.number().required(),
    Name:Joi.string().required(),
    Email:Joi.string().required(),
    Age:Joi.string().required(),
    Designation:Joi.string().required(),
    Gender:Joi.string().required(),
    DateOfBirth:Joi.string().required(),
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

    set_user(user){
        user.IsActive="true"
        user.IsDeleted="false"
        user.CreatedBy="Mujtaba"
        user.CreatedOn=date.format(now,"YYYY/MM/DD HH:mm:ss")
        user.UpdatedBy=""
        user.UpdatedOn=""
        return user
    },

    async valid_emp(emp){
        return emp_valid.validate(emp)

    }
}