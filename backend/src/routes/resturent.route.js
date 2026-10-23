import { Router } from "express";
import { getRestaurants } from "../controllers/resturent.controller.js";

const router = Router();

router.get("/current-user", getRestaurants);

export default router;
