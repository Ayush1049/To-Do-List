const express = require('express'); 
const cors = require('cors');  
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const TodoModel = require('./models/taskModel');
const path = require('path');

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/get', (req, res) => { 
    TodoModel.find().then(result => res.json(result))
    .catch(err => res.json(err))
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
    .then(result => res.json(result))
    .catch(err => res.json(err))
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.json(err))
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    if (!task) {
        res.send('Task is required');
    }
    TodoModel.create({
        task:task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, 'frontend', 'dist', 'index.html'))
    });
}
else {
    app.get('/', (req, res) => {
        res.send('API is running');
    });
}

app.listen(5000, () => { 
    console.log('Server is running on port 5000');
});