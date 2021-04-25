const router = require("express").Router();
const db = require("../models");

// create new workout
router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// get last workout and aggregate
router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
                totalDistance: { $sum: "$exercises.distance" },
                totalSets: { $sum: "$exercises.sets" },
                totalReps: { $sum: "$exercises.reps" },
                totalWeight: { $sum: "$exercises.weight" }
            }

        },
    ])

        .then(lastWorkout => {
            res.json(lastWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        });

});

// adding workouts to last workout

router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            $push: { exercises: req.body },
        },

    ).then(dbWorkout => {
        res.json(dbWorkout)
    })

        .catch(err => {
            res.josn(err);
        });

})

// stats view page

router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
                totalDistance: { $sum: "$exercises.distance" },
                totalSets: { $sum: "$exercises.sets" },
                totalReps: { $sum: "$exercises.reps" },
                totalWeight: { $sum: "$exercises.weight" }
            }
        },
        {
            "$sort": { _id: -1 }
        },
        {
            "$limit": 7
        }

    ])
        .then(workoutRange => {
            res.json(workoutRange)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

module.exports = router;