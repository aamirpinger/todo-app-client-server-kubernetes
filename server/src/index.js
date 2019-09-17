const express = require('express')
require('./db/mongoose')
const todoRoutes = require('./routes/todo-routes')
const userRoutes = require('./routes/user-routes')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(todoRoutes)
app.use(userRoutes)

app.listen(port, () => {
    console.log('Add ToDo server is up on port ' + port)
})

