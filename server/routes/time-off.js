const router = require("express").Router();
const CalendarRequest = require("../models/CalendarRequest.model");
const Session = require("../models/Session.model");

const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/create/", isLoggedIn, async (req, res) => {
  const accessToken = req.headers.authorization;
  try {
    const session = await Session.findById(accessToken).populate("user");
    const user = session.user;

    if (req.body.startDate && req.body.endDate && req.body.type) {
      const newCalendarRequest = await CalendarRequest.create({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        summary: req.body.summary,
        user: user._id,
        type: req.body.type,
        status: req.body.status 
      });
      return res.status(200).json(newCalendarRequest);
    } else {
      return res.status(400).json({ errorMessage: "Input values are invalid" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.toString() });
  }
});

router.post("/approve/:id", isLoggedIn, async (req, res) => {
  const id = req.params.id;
  try {
    const timeOff = await CalendarRequest.findByIdAndUpdate(id, {
      status: "Approved",
    },{new:true});
    return res.status(200).json(timeOff);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.toString() });
  }
});

router.post("/deny/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const timeOff = await CalendarRequest.findByIdAndUpdate(id, {
      status: "Denied",
    },{new:true});
    return res.status(200).json(timeOff);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.toString() });
  }
});

router.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const timeOff = await CalendarRequest.findByIdAndDelete(id,{new:true});
    return res.status(200).json(timeOff);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.toString() });
  }
});

module.exports = router;
