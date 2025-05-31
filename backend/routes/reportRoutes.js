const express = require("express");
const { createReport, getReports, assignTeam, completeTask } = require("../controllers/reportController");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/", upload.single("image"), createReport);
router.get("/get-reports", getReports);
router.post("/assign", assignTeam);
router.post("/complete", completeTask);

module.exports = router;
