import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { NotAuthorizedError } from '@panthera-errors/custom-errors';


export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers["x-access-token"];
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, process.env.JWT_KEY!);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    throw new Error("Not authorized")
  }
  //Call the next middleware or controller
  next();
};
