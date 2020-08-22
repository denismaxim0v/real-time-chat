import { Router, Request, Response } from 'express';

import users from './users'

const router = Router();

router.use("/api/users", users)

export default router;