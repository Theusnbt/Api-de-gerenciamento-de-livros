import controller from "./search.controller.js";
import express from "express";

const router = express.Router();

router.post("/new-book", controller.create);
router.get("/AllBook", controller.readAll);
router.get("/OneBook", controller.readOne);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;