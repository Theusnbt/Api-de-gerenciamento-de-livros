import controller from "./user.controller.js";
import express from "express";

const router = express.Router();

router.post("/login", controller.login);
router.post("/", controller.create);
router.get("/:id", controller.read);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;