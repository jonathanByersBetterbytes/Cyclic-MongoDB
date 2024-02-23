const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");

//Main Routes 
router.get("/", homeController.getIndex);



// router.get("/profile", ensureAuth, postsController.getProfile);
// router.get("/feed", postsController.getFeed);

// //Routes for user login/signup
// router.get("/login", authController.getLogin);
// router.post("/login", authController.postLogin);
// router.get("/logout", authController.logout);
// router.get("/signup", authController.getSignup);
// router.post("/signup", authController.postSignup);

module.exports = router;
