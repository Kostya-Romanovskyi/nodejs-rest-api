const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

// sign up
router.post("/register", validateBody(schemas.registerShema), ctrl.register);

router.get("/verify/:verificationCode", ctrl.verify);

router.post(
  "/verify",
  validateBody(schemas.emailShema),
  ctrl.resendVerifyEmail
);

// sign in
router.post("/login", validateBody(schemas.loginShema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
