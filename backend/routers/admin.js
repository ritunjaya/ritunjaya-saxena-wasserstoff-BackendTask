const {
    reviewImages,
    reviewImage,
    approveImage,
    rejectImage,
    registerUser
} = require("../controllers/admin");
const { verifyAdminToken } = require("../midleware/auth");

const router = require("express").Router();

router.get("/review", verifyAdminToken, reviewImages);
router.get("/review/:id", verifyAdminToken, reviewImage);
router.put("/approve/:id", verifyAdminToken, approveImage);
router.put("/reject/:id", verifyAdminToken, rejectImage);
router.post("/create-user", verifyAdminToken, registerUser);

module.exports = router;
