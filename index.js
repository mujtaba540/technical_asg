var express=require('express');
var router=require("./routes/routes")
var bodyParser=require('body-parser')

var app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(router)

app.listen(3000)
console.log('at 3000')
