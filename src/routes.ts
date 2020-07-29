import { Router } from "express";
import controller from "./controllers/TodoController";

const router: Router = Router();

router.get("/todos", controller.getTodos);
router.get("/todo/:id", controller.getTodo);
router.post("/todo", controller.addTodo);
router.delete("/todo/:id", controller.deleteTodo);
router.put("/todo/:id", controller.updateTodo);

export default router;