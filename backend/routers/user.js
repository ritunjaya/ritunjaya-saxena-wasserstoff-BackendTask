const router = require("express").Router();
const {
    registerUser, login, InsertImage,
    checkStatus,
    checkStatusById
} = require("../controllers/user");
const upload = require("../midleware/multer");
const { verifyToken } = require("../midleware/auth");

router.post("/register", registerUser);
router.post("/login", login);
router.post("/insertImage", verifyToken, upload.single("image"), InsertImage);
router.post("/status", verifyToken, checkStatus);
router.get("/status-image/:id", verifyToken, checkStatusById);

module.exports = router;

