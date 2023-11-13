const express = require('express')
const app = express()
const PORT =5050;
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv/config')

const mongoDBURL = process.env.DBUrL
// custom middlewares
app.set('view engine', 'ejs')
// app.use((req,res,next)=>{
//     console.log('new request made');
//     console.log('host:', req.hostname);
//     console.log('path', req.path);
//     console.log('method', req.method);
//     next()
// })

app.use(morgan('dev'))
app.use(express.static('public'))

// routes
// app.get('/', (req,res)=>{
//     res.send('Welcome')
// })

const tasks =[
    {name: 'Halimat', title:'Halimat clothing', task:'Client delievery to morning'},
    {name: 'Chimelu', title:'I.T exprience', task:'To give instructor my log book'},
    {name: 'Steve', title:'New House Alert', task:'Show client a new house'}
]

app.get('/',(req,res)=>{
    res.render('index',{title:'Home || Page', tasks})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About || Page'})
})

app.get('/tasks',(req,res)=>{
    res.render('tasks',{title:'Task || Page'})
})

app.use((req,res)=>{
    res.render('404',{title:'Error'})
})

// db connection
mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('Connected Successfully!');
})

app.listen(PORT,()=>{
    console.log(`Server connected to http://localhost:${PORT}`);
})