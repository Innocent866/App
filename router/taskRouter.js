const express = require('express');
const router = express.Router();
const { create_task, delete_task, route_task } = require('../controller/taskController');

// post route c -- create
router.post('/create',create_task)
  
  // delete route D -- delete
  router.get('/delete/:id',delete_task)
  
  // route params for single page
  router.get('/route/:id',route_task)
  
module.exports = router;