const express = require("express");
const bodyParser = require("body-parser");
var newlists = ["buy food","watch movie"];

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');


app.get("/",function(req, res){

   
    
    const options = { weekday: 'long',year: 'numeric', month: 'long', day: '2-digit' };
    const date = new Date();
    var todayday = date.toLocaleDateString('en-IN', options);
    res.render("lis",{day:todayday,})
    

   


})
app.post("/",function(req, res){
    newlist = body.Todolist
})



app.listen(3000,function(){
    console.log("server started at 3000");
})