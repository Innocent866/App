const express = require('express');
const router = express.Router();
const { create_task, delete_task, route_task, edit_task, edit_page } = require('../controller/taskController');

// post route c -- create
router.post('/create',create_task)
  
  // delete route D -- delete
  router.get('/delete/:id',delete_task)

   // edit route D -- delete
   router.get('/edit/:id',edit_task)

  //  update route u -- update
  router.post('/edit/:id',edit_page)
  
  // route params for single page
  router.get('/route/:id',route_task)
  
module.exports = router;