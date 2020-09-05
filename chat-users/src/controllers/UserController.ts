import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import "express-async-errors";
import { producer } from "../kafka";
import { BadRequestError } from 'chat-errors-package'
import passwordHash from 'password-hash'
export default class UsersController {
  static getAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    if (!users) {
      throw new BadRequestError("Couldn't find users");
    }

    res.status(200).json(users);
  };

  static getUser = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ id: req.params.id });

    if (!user) {
      throw new BadRequestError("Couldn't find a user");
    }

    res.status(200).json(user);
  };

  static createUser = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    let user = new User();
    req.body.password = passwordHash.generate(req.body.password);
    user = req.body;
    try {
      await userRepository.save(user);
    } catch (e) {
      throw new BadRequestError("Couldn't create user");
    }
    const payloads = [
      { topic: "users-create", messages: JSON.stringify(user), partition: 0 },
    ];
    producer.send(payloads, (err, data) => {
      if(err) {
        console.error(err)
      }
      console.log(data);
    });

    res.status(200).json(user);
  };

  static updateUser = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    let user = await userRepository.findOne({ id: req.params.id });

    user = { ...user, ...req.body };

    try {
      await userRepository.save(user);
    } catch (e) {
      throw new BadRequestError("Couldn't update a user");
    }
    res.status(200).json(user);
  };

  static deleteUser = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ id: req.params.id });
    try {
      await userRepository.delete(user);
    } catch (e) {
      throw new BadRequestError("Couldn't delete user");
    }
  };
}
