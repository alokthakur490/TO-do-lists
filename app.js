const express = require("express");
const bodyParser = require("body-parser");
var todos = ["buy food","cook food"];

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');


app.get("/",function(req, res){

   
    
    const options = { weekday: 'long',year: 'numeric', month: 'long', day: '2-digit' };
    const date = new Date();
    var todayday = date.toLocaleDateString('en-IN', options);
    res.render("lis",{day : todayday,newlist :todos});

   
   

  

})
app.post("/",function(req, res){
    todo = req.body.Todolist;
    todos.push(todo);
    res.redirect("/");
   
})


app.listen(3000,function(){
    console.log("server started at 3000");
})