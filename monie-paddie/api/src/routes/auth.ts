import express from "express";
import * as user from "../controllers/user";
import passport from "passport";

const router = express.Router();

// /auth

router.post("/login", user.login);

router.get("/google",passport.authenticate("google", { scope: ["profile", "email", "openid"] }));
router.get("/google/redirect", passport.authenticate("google"), user.login);

export default router;
