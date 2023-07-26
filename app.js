const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://thakuralok490:thakuralok-490@cluster0.1prvmml.mongodb.net/todolistDB")



const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');



const todolistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      }
    
 });

 const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      item :[todolistSchema]
    
 });
 const List = mongoose.model("List", listSchema);
 
 
 
  const Item = mongoose.model("Item", todolistSchema);

const list1 = new Item({
    name : "watch movie",
});
const list2 = new Item({
    name : "buy food",
});
const list3 = new Item({
    name : "cook food",
});

const alllist = [list1, list2,list3 ]; // create a array of items doc






//get 
app.get("/",function(req, res){
  
    Item.find().then((data) => {
        // console.log(data);
        if(data.length === 0){
     Item.insertMany(alllist).then(function () {
    console.log("Successfully saved defult items to DB");
  }).catch(function (err) {
    console.log(err);
  });
  res.redirect("/");
        } else {
            res.render("lis",{day:"today",newlists : data});
            
        }   })
})


//post
app.post("/",function(req, res){
   const  newlist = req.body.Todolist;
   const listname = req.body.list;
   const list4 = new Item({
    name : newlist,
});

if(listname === "today"){
    list4.save();
    res.redirect("/");
} else{
    var listite = List.findOne({name : listname}).exec();
listite.then(function (doc) {
    
  doc.item.push(list4);
  doc.save();
  res.redirect("/"+ listname);
});
}  })

//post delete

app.post("/delete",function(req, res){
  const id = req.body.checkbox;
  const listName = req.body.listname;
  if(listName === "today"){
     
//delete ways
Item.findByIdAndRemove({_id :id}).then(function(err){
    if(err){
             console.log(err);
          } else{
             console.log("succesfully deleted");
            
          }   
          res.redirect("/");  
 });
 
  } 
  else {
    List.findOneAndUpdate({name : listName},{$pull :{item : {_id : id}}}).then(function(err){
        if(err){
           //console.log(err);
        } 
        res.redirect("/" + listName);
    })
     }
})

//custom webpage

app.get("/:customname",function(req, res){
   const customname = (req.params.customname);
   var listitem = List.findOne({name : customname}).exec();
listitem.then(function (doc) {
    
    if(doc === null){
        const list = new List({
            name :customname,
            item : alllist
           });
           list.save();  
         res.redirect("/"+customname);
         
    } 
    else{
    res.render("lis",{day:doc.name,newlists : doc.item});
    }
});  
})





app.listen(3000,function(){
    console.log("server started at 3000");
})