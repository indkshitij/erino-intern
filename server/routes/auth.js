import { Router } from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controller/authController.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/me", authRequired, getCurrentUser);

authRouter.get("/check", authRequired, (req, res) => {
  res.json({
    success: true,
    message: "User is authenticated",
    userId: req.userId,
  });
});

export default authRouter;
