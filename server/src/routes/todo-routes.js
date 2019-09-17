const express = require('express')
const ToDos = require('../models/Todos-model')
const auth = require('../middlewares/auth')
const routes = express.Router()

routes.post('/todo/add', auth, async (req, res) => {
    const newTodo = req.body
    const fieldsToAdd = Object.keys(newTodo)
    const fieldsInModel = ['title', 'description']
    const isAdditionAllowed = fieldsToAdd.every((field) => fieldsInModel.includes(field))

    if (!isAdditionAllowed) {
        return res.status(400).send({ error: 'Invalid fields to Add!' })
    }

    try {
        const todo = await ToDos({
            ...newTodo,
            user: req.user._id
        })

        await todo.save()

        res.send({ todo })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

routes.get('/todo/list', auth, async (req, res) => {
    try {
        const todos = await ToDos.find({
            user: req.user._id
        })

        res.send(todos)
    }
    catch (e) {
        res.status(500).send
    }
})


routes.get('*', async (req, res) => {
    try {

        res.status(404).send({
            error: "Invalid endpoint."
        })
    }
    catch (e) {
        res.status(500).send
    }
})

module.exports = routes

