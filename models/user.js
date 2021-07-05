class user_signUp{
    constructor(){
        this.UserID=""
        this.FirstName=""
        this.LastName=""
        this.Username=""
        this.Password=""
        this.Address=""
        this.PhoneNumber=""
        this.IsActive=""
        this.IsDeleted=""
        this.CreatedBy=""
        this.CreatedOn=""
        this.UpdatedBy=""
        this.UpdatedOn=""
    }
}
class user_signIn{
    constructor(){
        this.Username=""
        this.Password=""
    }
}


module.exports=user_signIn
module.exports=user_signUp