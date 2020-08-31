import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Request, Response } from "express";
import "express-async-errors";
import passwordHash from "password-hash";
import * as jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { BadRequestError } from "chat-errors-package";
export default class AuthController {
  static signin = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ email: req.body.email });

    if (!user) {
      throw new BadRequestError("User does not exist");
    }

    const passwordMatch = passwordHash.verify(req.body.password, user.password);

    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    const jwt_data = {
      user_id: user.id,
    };
    const token = jwt.sign(jwt_data, process.env.JWT_KEY!, {
      expiresIn: "30s",
    });

    res.status(200).json({user, token})
  };
  static signup = async (req: Request, res: Response) => {};
  static signout = async (req: Request, res: Response) => {};
  static test = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    if (!users) {
      throw new Error("No users found");
    }

    res.status(200).json(users);
  };
}
