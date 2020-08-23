const router = require("express").Router();
const statisticsController = require("../controllers/statisticsController");
const protect = require("../middlewares/protect");

router.use(protect);
router.get("/", statisticsController.getStatistics);
module.exports = router;
