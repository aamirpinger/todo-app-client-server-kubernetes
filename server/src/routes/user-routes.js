const express = require('express')
const Users = require('../models/Users-model')
const auth = require('../middlewares/auth')
const routes = express.Router()


// User create (signup)
routes.post('/user/signup', async (req, res) => {
    const newUser = req.body
    const fieldsToAdd = Object.keys(newUser)
    const fieldsInModel = ['name', 'email', 'password']
    const isAdditionAllowed = fieldsToAdd.every((field) => fieldsInModel.includes(field))

    if (!isAdditionAllowed) {
        return res.status(400).send({ error: 'Invalid fields to Add!' })
    }

    try {
        const user = await Users(newUser)

        await user.save()

        res.send({ user })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// Login user
routes.post('/user/login', async (req, res) => {
    try {
        const user = await Users.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })

    } catch (e) {
        res.status(400).send()
    }
})

//logout user
routes.post('/user/logout', auth, async (req, res) => {
    try {
        const { user, token } = req

        user.tokens = user.tokens.filter((t) => t.token !== token)
        await user.save()

        res.send()
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = routes