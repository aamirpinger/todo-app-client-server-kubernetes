const mongoose = require("mongoose")

const ToDosSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, {
    timestamps: true
})

const ToDos = mongoose.model('ToDos', ToDosSchema)

module.exports = ToDos

