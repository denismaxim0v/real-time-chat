import { Router } from "express";
import UsersController from "../controllers/UserController";

const users = Router();

users.get("/users", UsersController.getAll);
users.post("/create_user", UsersController.createUser);
users.put("/:id", UsersController.updateUser);
users.delete("/:id", UsersController.deleteUser);
users.get("/:id", UsersController.getUser);


export default users;
