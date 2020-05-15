const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

const db = require('./models');

const logger = require('morgan');
app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }))
    .use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Workout', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.get('/api/workouts', function(req, res) {
    db.Workout.find()
        .then(workouts => {
            res.json(workouts)
        })
        .catch(err => res.status(500).json(err))
});

app.post('/api/workouts', function (req, res) {
    db.Workout.create(req.body)
        .then(workouts => {
            res.json(workouts)
        })
        
        .catch(err => {console.log(err); res.status(500).json(err)} )
})

app.put('/api/workouts/:id', function(req, res){
    req.params.find
        db.Workout.findByIdAndUpdate(req.params.id, {
            $push: {
                exercises: req.body
            }
        }, { new: true, runValidators: true})
        .then(workouts => {
            res.json(workouts)
        })
        .catch(err => {console.log(err); res.status(500).json(err)} )
});

app.get("/exercise", (req, res) => {
    res.sendFile(__dirname + "/public/exercise.html");
});

app.get("/stats", (req, res) => {
    res.sendFile(__dirname + "/public/stats.html")
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find().limit(7).then()
    .then(workouts => {
        res.json(workouts)
    })
    .catch(err => res.status(500).json(err))

})

app.delete("/api/workouts", (req, res) => {
    db.Workout.findByIdAndDelete(req.params.id)
    .then(workouts => {
        res.json(workouts)
    })
    .catch(err => res.status(500).json(err))
})


app.listen(PORT, () => {
    console.log('Express server is listening on port ', PORT, ' .')
})