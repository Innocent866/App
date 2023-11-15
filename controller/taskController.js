const Tasks = require('../model/taskModel');

const create_task = async(req,res)=>{
    // console.log(req.body)
    const newTasks = new Tasks(req.body)
    try{
      await newTasks.save();
      res.status(201).redirect('/')
    }
    catch(error){
      console.log(error);
    }
  };


//   delete
const delete_task = async(req,res)=>{
    const id = req.params.id
      try{
        await Tasks.findByIdAndDelete(id)
         res.redirect('/')
        
      }catch(error){
          console.log(error);
      }
  
  };

// route params for single page
const route_task = async(req,res)=>{
    const id = req.params.id
      try{
        const result = await Tasks.findById(id)
        res.status(200).render('singlePage',{title: 'single || page', task:result})
        
        
      }catch(error){
          console.log(error);
      }
  
  };

module.exports = {route_task,delete_task,create_task}