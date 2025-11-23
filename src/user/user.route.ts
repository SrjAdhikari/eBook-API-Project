//* src/user/user.route.ts

import { Router } from "express";
import { createUser } from "./user.controller";

const userRouter = Router();

// Create User
userRouter.post("/register", createUser);

export default userRouter;
