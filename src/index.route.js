import express from "express";
import userRoute from "./features/user/user.route.js";
import searchRoute from "./features/search/search.route.js"

const router = express.Router();

router.use("/user", userRoute);
router.use("/book", searchRoute);

export default router;