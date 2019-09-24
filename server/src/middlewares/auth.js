const jwt = require('jsonwebtoken')
const Users = require('../models/Users-model')

const auth = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ', '')
        const token = req.cookies['todo-jt']

        if (token === '') {
            res.redirect(401, '/login')
        }
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Users.findOne({ _id: decoded_token._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user

        next()
    } catch (e) {
        res.status(401).send({ error: 'Please login first.' })
    }
}
module.exports = auth

