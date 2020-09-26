import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Request, Response } from "express";
import "express-async-errors";
import passwordHash from "password-hash";
import * as jwt from "jsonwebtoken";
import { deleteSession, setSession } from '../redis';

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

    user.loggedIn = true;

    try {
      await userRepository.save(user)
    } catch (e) {
      throw new BadRequestError("Could not sign in")
    }

    const jwt_data = {
      user_id: user.id,
    };
    const token = jwt.sign(jwt_data, process.env.JWT_KEY!, {
      expiresIn: "30s",
    });

    setSession(user.id, token);

    res.status(200).json({user, token})
  };

  static signup = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    let user = new User();
    user = req.body;
    user.password = passwordHash.generate(req.body.password);

    try {
      await userRepository.save(user)
    } catch (e) {
      throw new BadRequestError("Could not create a user")
    }

    res.status(200).json(user)
  };

  static signout = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(req.body.id);

    user.loggedIn = false;

    try {
      await userRepository.save(user);
    } catch (e) {
      throw new BadRequestError("Could not logout")
    }

    deleteSession(req.body.id);

    res.status(200).json(user)
    
  };

  static test = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    if (!users) {
      throw new Error("No users found");
    }

    res.status(200).json(users);
  };
}
