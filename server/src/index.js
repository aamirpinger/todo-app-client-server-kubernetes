const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const todoRoutes = require('./routes/todo-routes')
const userRoutes = require('./routes/user-routes')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(todoRoutes)
app.use(userRoutes)

app.listen(port, () => {
    console.log('ToDo server is up on port ' + port)
})

