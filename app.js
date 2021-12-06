const express = require('express');
const mongoose = require('mongoose');
const Goal = require('./models/goal')
const http = require('http')

//express app
const app = express();
const port = process.env.PORT || 3000
const server = http.createServer(app)

//starting serve
const dbURL = 'mongodb+srv://dasas:dasas@cluster0.wqk86.mongodb.net/Cluster0?retryWrites=true&w=majority'
mongoose.connect(dbURL)
    .then((result) => server.listen(port))
    .catch((err) => console.log(err))


//middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/add-goal',(req,res)=>{        //přidání new blog do db po načtení stránky
    const nugoal = new Goal({
        title: 'new goal',
    });
    nugoal.save()
        .then((result) => {
            res.send(result)
            console.log('added to db')
        })
        .catch((err)=>{
            console.log(err)
        })
})

//route 
app.get('/', (req,res) => {
    res.redirect('/goals')
    res.render('index')
})

app.get('/goals', (req,res) => {
    Goal.find().sort({createdAt: 1})
    .then((result) => {
        res.render('index', { title: 'All Goals'})
    })
    .catch((err)=>{
       console.log(err)
    })
})
app.post('/goals', (req,res) => {
    const goal = new Goal(req.body);
    goal.save()
        .then((result) => {
            res.redirect('/goals')
            console.log('added to db')
        })
        .catch((err)=>{
            console.log(err)
        })
    console.log(req.body)
})
/************************** API ************************/

const goals = [
    {id: 1, title: 'learn vue'},
    {id: 2, title: 'learn node'},
    {id: 3, title: 'find a job'}
];

app.get('/api/goals', async (req,res) => {
    const allGoals = await Goal.find()
    res.send(allGoals)
});
app.get('/api', async (req,res) => {
    res.redirect('/api/goals')
})
app.post('/api/goals', async (req, res) => {
    const goal = new Goal(req.body);
    goal.save()
        .then((result) => {
            console.log('added to db')
        })
        .catch((err)=>{
            console.log(err)
        })
    goals.push(goal);
    res.send(allGoals)
})
app.put('/api/goals/:id', async (req,res) => {
    const id = req.params.id
    let done = req.body.done
    console.log(done)
    await Goal.findByIdAndUpdate(id,{done: done})
})
app.get('/api/goals/:id', async (req, res) => {
    const id = req.params.id
    const visitorData = await Goal.findById(id)
   if(!visitorData){
    res.send('id wasn´t found')
  } else {
        res.send(visitorData.title + visitorData.done)
        console.log('id is: ' + id)
   }
})

app.delete('/api/goals/:id', async (req,res) => {
    const id = req.params.id 
    console.log(id)
    await  Goal.deleteOne({_id:id})
})
/******************************************************/

app.use((req,res) =>{
    res.status(404).render('404', { title: 'Terka didn´t found '});
})