const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Task = require("../models/Task.model");
const Session = require("../models/Session.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/create", isLoggedIn, async (req, res) => {
  const { description, userId } = req.body.task;

  try {
    if (!description) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide a task description" });
    }

    const newTask = await Task.create({
      description: description, user: userId
    });
    const user = await User.findByIdAndUpdate(userId, {
      $push: { tasks: newTask._id },
    });

    return res.status(200).json(newTask);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
});

router.get("/my-tasks/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const userFromDb = await User.findById(userId).populate("tasks");
    res.status(200).json({tasks: userFromDb.tasks});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.toString() });
  }
});


router.patch("/tasks/delete/:userId/:taskId", async (req, res) => {
  const {userId, taskId} = req.params
  try{
      const userFromDB = await User.findByIdAndUpdate(userId, {$pull: {tasks: taskId}}) 
      res.status(200).json({msg: "Changes made succesfully", user: User})
  } catch(err){
      console.log((err))
  }
});


module.exports = router;
