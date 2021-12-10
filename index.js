//importing express js Library
const express=require('express');
const path = require('path');
const Todo=require('./models/model.js');
//instantiation app as express
const dotenv=require('dotenv');

dotenv.config();



 app=express();

let dburl=process.env.DB_URL;

const mongoose = require('mongoose');
mongoose.connect(dburl,
    {
      useNewUrlparser:true,
useUnifiedTopology:true}).then(()=>{
    console.log("Database connected successfully");

}).catch((err) => {
    console.log(`Error in database coonection:: ${err}`);
});
//declare a port
const port=process.env.PORT||300;
//create a server
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});



//get request for post todo
app.get('/post-todo', (req,resp)=>{
    let todo=new Todo({
        tittle:"Trip to Finland",
        description:"Trip to Finland on 30th Jan 2022",
        status:true
    })
    //save todo
    todo.save().then(()=>{
        console.log("Todo created successfully");
        resp.redirect('/fetch');
    }).catch(()=>{
        console.log("Error in creating a todo");
    });
});

//get.request to fetch todo
app.get('/fetch', (req,resp)=>{
    Todo.find().then((todos)=>{
        console.log("Fetching data");
        console.log(todos);
        resp.send(todos);
    }).catch((err)=>{
        console.log(`Error fetching todo ::\t${err}`);
    });
});

app.get('public/', (req,resp)=>{
    resp.sendFile((path.join(__dirname, 'public','index.html')));
});

app.use('/static', express.static(path.join(__dirname, 'Node Js')));


app.get('/home', (req,resp)=>{
    resp.send("This is my home page");
});

app.post('/', function (req, res) {
    res.send("Welcome to my first node app");
  });

  app.delete('/delete', function (req, res) {
    res.send('Deleted successfully');
  });

  app.patch('/patch', function (req, res) {
    res.send('Updated successfully');
  });

