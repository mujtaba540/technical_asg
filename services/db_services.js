var mssql=require('mssql')

var config={
        user:'db_a7667a_mujtaba6099_admin',
        password:'5115814P@k',
        database:'db_a7667a_mujtaba6099',
        server:'SQL5053.site4now.net',
        port:1433,
        options:{
            trustServerCertificate:true
        }
}

module.exports={
    async user_signin(user){
        try{
            var connection= await mssql.connect(config);
            var data=await connection.request()
            .input('Username',mssql.NVarChar,user.Username)
            .input('Password',mssql.NVarChar,user.Password)
            .query("Select * from [User] where Username=@Username and Password=@Password")
            if(data.rowsAffected>0){
                return true;
            }else{
                return false;
            }

        }catch(err){
            console.log(err)
        }
    }
}