const express = require("express");
const {
    register,
    login,
    signout,
    checkEmailInDB,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/check-email", checkEmailInDB);
router.post("/login", login);
router.post("/signout", signout);

module.exports = router;
