const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    day: {
        type: Date,
        default: function () {
            return new Date();
        }
    },
    exerises: [
        {
            type: {
                type: String,
                required: true
            },
       
            name: {
                type: String,
                trim: true,
                required: true
            },

            duration: {
                type: Number,
                required: true
            },

            weight: {
                type: Number
            },

            reps: {
                type: Number
            },

            sets: {
                type: Number
            },

            distance: {
                type: Number
            }
        }
    ],
});


//creating the Model
const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;