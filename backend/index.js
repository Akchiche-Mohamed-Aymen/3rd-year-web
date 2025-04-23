// Import required modules
import express from 'express'
import cors from "cors"

// Initialize express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Test route
const users = []
let todos = []
app.post('/login', (req, res) => {
    const {password , username} = req.body
    const user = users.find(u => u.username === username && u.password === password)
    if(!user ){
        return res.status(404).json({msg : "user not exists"})
    }
    res.status(201).json({user})

});

// Example POST route
app.post('/register', (req, res) => {
    const {password , username} = req.body
    const find = users.find(u => u.username === username)
    
    if(find){
        return res.status(404).json({msg : "user exists"})
    }
    const newUser = {...req.body , id : users.length + 1}
    users.push(newUser)
    res.status(201).json({newUser})
});
// Example POST route
app.post('/todos', (req, res) => {
    const {userId} = req.body
    const find = users.find(u => u.id === userId)
    if(!find){
        return res.status(402).json({msg : "user not exists"})
    }
    const newTodo = {...req.body , id : todos.length + 1 , completed : false}
    todos.push(newTodo)
   res.status(201).json({newTodo})
});
app.put('/todos/:id', (req, res) => {
    const {id} = req.params
    let  todo = todos.find(u => u.id == id)
    if(!todo){
        return res.status(404).json({msg : "todo not exists"})
    }
    todo = {...todo , ...req.body}
    todos = todos.map(t=>{
        if(t.id != id) return t
        else return todo
    })
    res.status(201).json({todo , status: 200})
});
app.get('/todos/:id', (req, res) => {
    const {id} = req.params
    console.log(id)
    let  exist = todos.find(u => u.userId == id)
    if(!exist){
        return res.status(404).json({msg : "todos not exists"})
    }
    let todoOwn = todos.filter(t => id == t.userId)
    res.status(201).json({ todos : todoOwn , status: 200})
});
app.delete('/todos/:id', (req, res) => {
    const {id} = req.params
    console.log(req.body)
    const {userId} = req.body
    let todo = todos.find(u => u.userId === +userId)
    console.log(todo , userId , id)
    if(!todo){
        return res.status(404).json({msg : "todos not exists"})
    }
    todos = todos.filter(t => +id !== t.id)
    for(let i = 0 ; i < todos.length ; i++)
        todos[i].id = i+1
    res.status(201).json({ todos , status: 200})
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
