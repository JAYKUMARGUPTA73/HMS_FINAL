const express = require("express");
const { signUp, login, logout } = require("../controllers/auth.controller");
const Complaint = require("./complaintRoute");
const menu = require("../controllers/Messmenu");
const { getMenu } = require("../controllers/GetMenu");
const addHostel = require("../controllers/Hostelscontroller");
const createAnnouncement = require("../controllers/CreateAnnouncement");
const getAnnouncements = require("../controllers/GetAnnouncement");
const getStudent = require("../controllers/GetStudent");
const updateStudent = require("../controllers/UpdateStudent");
const createMessage = require("../controllers/SendMessage");
const getGroupMessage = require("../controllers/GetGroupMessage");
const createGroup = require("../controllers/CreateGroup");
const getGroups = require("../controllers/GetGroup");
const {
  authenticateUser,
  authenticateAdmin,
} = require("../controllers/authentication");

const bodyParser = require("body-parser");

// Set up Multer for file upload
const multer = require("multer");
const { uploadMiddleware } = require("../controllers/uploadMiddleware");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// Routes
router.post("/signup", upload.single("profile_pic"), uploadMiddleware, signUp);
router.post("/login", login);
router.post("/logout", authenticateUser, logout);
router.post("/complaint", authenticateUser, Complaint);
router.post("/setmenu", authenticateUser, menu);
router.post("/getmenu", authenticateUser, getMenu);
router.post("/addhostel", authenticateAdmin, addHostel);
router.get("/getStudent:hostel_no", authenticateAdmin, getStudent);
router.post("/updateStudent", authenticateAdmin, updateStudent);
router.post("/createannouncement", authenticateAdmin, createAnnouncement);
router.post("/getannouncements", authenticateUser, getAnnouncements);
router.post("/send", authenticateUser, createMessage);
router.post("/createGroup", authenticateAdmin, createGroup);
router.get("/getgroup", authenticateUser, getGroups);

// File upload route
router.post("/testfb", upload.single("file"), uploadMiddleware)

router.get("/getgroupmessages/:group_id", authenticateUser, getGroupMessage);

module.exports = router;
