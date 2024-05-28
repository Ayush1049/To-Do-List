const mongoose = require('mongoose');
const { type } = require('os');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    }
},
    { timeStamp: true }
);

const TodoModel = mongoose.model('todos', taskSchema);

module.exports = TodoModel;