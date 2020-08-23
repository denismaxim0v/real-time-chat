import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Request, Response } from "express";
import "express-async-errors";
export default class AuthController {
  static signin = () => {};
  static signup = () => {};
  static signout = () => {};
  static test = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    if (!users) {
      throw new Error("No users found");
    }

    res.status(200).json(users);
  };
}
