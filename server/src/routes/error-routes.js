const express = require('express')
const routes = express.Router()


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