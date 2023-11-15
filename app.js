const express = require("express");
const app = express();
const port = 5050;
const morgan = require("morgan");
// const mongoose = require("mongoose");
const Task = require('./model/taskModel')
const connect = require("./db/mongoDB");
const taskRouter = require("./router/taskRouter")
require("dotenv/config");
const Tasks = require("./model/taskModel");

//custom middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
// app.set("view engine", "ejs");
// app.use((req, res) => {
//   console.log("new request made");
//   console.log("host: ", req.hostname);
//   console.log("path", req.path);
//   console.log("method", req.method);
//   next();
// });

//TESTING DATABASE AND MODEL
// .save() method is a mongoose method for fettingall the data from out database
app.get("/post-task", async (req, res) => {
  const testData = new Tasks({
    name: "Innocent",
    title: "express tuts",
    task: "we started using mongoDB",
  });

  try {
    const newTasks = await testData.save();
    res.status(201).send(newTasks);
  } catch (error) {
    console.log(error);
  }
});

// .find() method is a mongoose method for fettingall the data from out database

app.get('/get-posts',async(req,res)=>{
    try{
        const getTasks = await Tasks.find();
        res.status(200).send(getTasks)
    }catch(error){
        console.log(error);
    }
})

// .findById() method is a mongoose method for fettingall the data from out database
app.get('/single-task',async(req,res)=>{
    try{
        const singleTask = await Tasks.findById()
        res.status(200).send(singleTask)
    }catch(error){
        console.log(error);
    }
})

// END OF DATABASE TEST

app.use(morgan("dev"));
app.use(express.static("public"));

// Routee
// app.get("/", (req, res) => {
//   res.send("Welcome Home");
// });


// const tasks = [
//   {
//     name: "Emphil",
//     title: "emphil clothing",
//     task: "client deliveries this morning",
//   },
//   {
//     name: "Steve",
//     title: "steve clothing",
//     task: "client deliveries this afternoon",
//   },
//   {
//     name: "Enoo",
//     title: "enoo clothing",
//     task: "client deliveries this evening",
//   },
// ];

// api
app.use('/api/v1',taskRouter)

// Page routes
app.get("/", async (req, res) => {
  try{
    const result = await Tasks.find();
    res.render("index", { title: "Home || Page ", tasks: result});
  }catch(error){
    console.log(error);
  }
 
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About || Page " });
});

app.get("/tasks", (req, res) => {
  res.render("tasks", { title: "Task || Page " });
});

app.use((req, res) => {
  res.render("404", { title: "Error || Page " });
});

// db connection

connect().then(() => {
  try {
    app.listen(port, () => {
      console.log(`server connected to http://localhost:${port}`);
    });
  } catch (error) {
    console.log("cannot connect to the server");
  }
})