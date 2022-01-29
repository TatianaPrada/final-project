const differenceInMinutes = require('date-fns/differenceInMinutes')
const router = require("express").Router();
const ClockInOut = require("../models/ClockInOut.model");
const Session = require("../models/Session.model");

const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/start", async (req, res) => {
  const accessToken = req.headers.authorization;
  try {
    const session = await Session.findById(accessToken).populate("user");
    const user = session.user;

    if (req.body.startDate) {
      const clockIn = await ClockInOut.create({
        startDate: req.body.startDate,
        user: user._id,
      });
      return res.status(200).json(clockIn);
    } else {
      return res.status(400).json({ errorMessage: "Start date is invalid" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.toString() });
  }
});

router.patch("/end/:id", async (req, res) => {
  try {
    const clockinOutId = req.params.id;

    if (req.body.endDate) {

      const currentClock = await ClockInOut.findById(clockinOutId);
      const clockOut = await ClockInOut.findByIdAndUpdate(clockinOutId, {
        endDate: req.body.endDate,
        workingHours:differenceInMinutes(new Date(req.body.endDate),new Date(currentClock.startDate))
      });
      return res.status(200).json(clockOut);
    } else {
      return res.status(400).json({ errorMessage: "End date is invalid" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.toString() });
  }
});

router.get("/get-current-clock-in", isLoggedIn, async (req, res) => {
  const accessToken = req.headers.authorization;
  try {
    const session = await Session.findById(accessToken).populate("user");
    const openClockIn = await ClockInOut.findOne({
      endDate: { $eq: null },
      user: { $eq: session.user._id },
    });
    return res.status(200).json(openClockIn);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.toString() });
  }
});

router.get("/get-all-my-clocks", isLoggedIn, async (req, res) => {
  const accessToken = req.headers.authorization;
  try {
    const session = await Session.findById(accessToken).populate("user");
    const allMyClocks = await ClockInOut.find({
      user: { $eq: session.user._id },
    }).populate("user").sort([["startDate",-1]]);
    return res.status(200).json(allMyClocks);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.toString() });
  }
});

module.exports = router;
