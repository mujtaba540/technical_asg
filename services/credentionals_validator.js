var Joi=require('joi')
var bcrypt=require('bcrypt')
var date=require('date-and-time')



const signIn=Joi.object().keys({
    Username:Joi.string().trim().email().required(),
    Password:Joi.string().required()
})

const signUp=Joi.object().keys({
    FirstName:Joi.string().required(),
    LastName:Joi.string().required(),
    Username:Joi.string().trim().email().required(),
    Password:Joi.string().required(),
    PhoneNumber:Joi.string().required(),
    Address:Joi.string().allow('').optional(),
    IsActive:Joi.bool().required(),
    IsDeleted:Joi.bool().required(),
    CreatedBy:Joi.string().required(),
    CreatedOn:Joi.date().required(),
    UpdatedBy:Joi.string().allow('').optional(),
    UpdatedOn:Joi.date().allow('').optional()
})

const emp_valid=Joi.object().keys({
    UserID:Joi.number().required(),
    Name:Joi.string().required(),
    Email:Joi.string().trim().email().required(),
    Age:Joi.string().required(),
    Designation:Joi.string().required(),
    Gender:Joi.string().required(),
    DateOfBirth:Joi.date().required(),
    IsActive:Joi.bool().required(),
    IsDeleted:Joi.bool().required(),
    CreatedBy:Joi.string().required(),
    CreatedOn:Joi.date().required(),
    UpdatedBy:Joi.string().allow('').optional(),
    UpdatedOn:Joi.date().allow('').optional()
})
const rounds=10;
var now=new Date();
module.exports={
   async valid_signin(user){
    return signIn.validate(user);
    },

    async valid_signup(user){
        return signUp.validate(user)
    },

    async ecrypt_pwd(pwd){
        return bcrypt.hash(pwd,rounds);
    },

    async valid_emp(emp){
        return emp_valid.validate(emp)

    }
}