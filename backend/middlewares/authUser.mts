import type { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModels.mts";

type authPayload = JwtPayload & {
  id: String;
};

const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { token } = req.cookies;
  if (!token) {
    res.json({
      success: false,
      message: "Not authorized , you must login first.",
    });
    return;
  }
  try {
    const decodedToken = (await jwt.verify(
      token,
      process.env.JWT_KEY_SECRET!,
    )) as authPayload;

    const user = await User.findById(decodedToken.id);
    if (!user) {
      res.json({ success: false, message: "Not authorized , user not found." });
      return;
    }
    (req as any).userId = user._id;
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

export default authUser
