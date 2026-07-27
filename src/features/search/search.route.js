import controller from "./search.controller.js";
import express from "express";
import auth from "../../middleware/auth.middleware.js"

const router = express.Router();

router.use(auth);

router.post("/new-book", controller.create);
router.get("/all-book", controller.readAll);
router.get("/one-book/:id", controller.readOne);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;