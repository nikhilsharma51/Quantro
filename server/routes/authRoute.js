import { Router } from "express";
import {registerUser , loginUser ,getMe , logoutUser} from "../controllers/authController.js";
import {protect} from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/signup', registerUser);
router.post('/login' , loginUser);
router.post('/logout' ,protect , logoutUser)
router.get('/me' , protect , getMe);

export default router;