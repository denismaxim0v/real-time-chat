import { Router } from "express";
import AuthController from "../controllers/AuthController";

const auth = Router();

auth.post("/signin", AuthController.signin);
auth.post("/signup", AuthController.signup);
auth.post("/signout", AuthController.signout);


export default auth;
