const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://MandarMaster:mandar@619@cluster0-vgmw1.mongodb.net/restAPI",{useNewUrlParser: true,useUnifiedTopology: true});
const postSchema=new mongoose.Schema({
  title:String,
  content:String
});

const Post=mongoose.model("post",postSchema);

// const post=new Post({
//   title:"MAN",
//   content:"This is 2nd test."
// });
//
// post.save();

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});


app.route("/articles")

.get(function(req,res){
  Post.find({},function(err,docs){
    res.send(docs);
  });
})

.post(function(req,res){
  const post=new Post({
    title:req.body.title,
    content:req.body.content
  });
  post.save();
  res.send("Successfully inserted");
})


.delete(function(req,res){
  Post.deleteMany({},function(err){
    if(!err)
      res.send("deleted Successfully");
  })
})



app.route("/articles/:articleName")

.get(function(req,res){
  const whichPost=req.params.articleName;
  Post.findOne({title:whichPost},function(err,doc){
    res.send(doc);
  });
})

.post(function(req,res){
  console.log(req.body);
  const whichPost=req.params.articleName;
  const content=req.body.content;
  const post=new Post({
    title:whichPost,
    content:content
  });
  post.save();
  res.send("Inserted the document successfully");
})

.delete(function(req,res){
  const whichPost=req.params.articleName;
  Post.deleteOne({title:whichPost},function(err){
    if(!err)
      res.send("Delete the article successfully");
  })
})

.put(function(req,res){
  const whichPost=req.params.articleName;
  const title= req.body.title;
  const content=req.body.content;
  Post.update({title:whichPost},{title:title,content:content},{overwrite:true},function(err,results){
    if(!err)
    res.send(results);
  });
})

.patch(function(req,res){
  const whichPost=req.params.articleName;
  Post.update({title:whichPost},req.body,function(err,results){
    if(!err)
      res.send(results);
  });

});


app.listen(process.env.PORT || 3000,function(){
  console.log("Server has started");
});
