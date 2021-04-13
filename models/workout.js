const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now
        },
        exercises: [
            {


                type: {
                    type: String,
                    trim: true,
                    required: "Is this Resistance or Cardio?"
                },

                name: {
                    type: String,
                    trim: true,
                    required: "Enter a name for the workout."
                },
                duration: Number,
                distance: {
                    type: Number,
                    default: 0,
                },
                weight: {
                    type: Number,
                    default: 0,
                },
                reps: {
                    type: Number,
                    default: 0,
                },
                sets: {
                    type: Number,
                    default: 0,
                },

            }]
    });

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;