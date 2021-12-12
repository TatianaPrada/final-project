const router = require("express").Router();
const authRoutes = require("./auth");
const calendarRoutes = require("./calendar");
const timeOffRoutes = require("./time-off");
const userRoutes = require("./users")

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/calendar-requests",calendarRoutes);
router.use("/time-off",timeOffRoutes);

router.use("/user", userRoutes)

module.exports = router;
