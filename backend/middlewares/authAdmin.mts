import type { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import User from "../models/userModels.mts";

type AuthPayload = JwtPayload & {
  id: String;
};

const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { token } = req.cookies;
  if (!token) {
    res.json({ success: false, message: "Not authorized." });
    return;
  }
  try {
    const decodedToken = (await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!,
    )) as AuthPayload;
    const user = await User.findById(decodedToken.id);
    if (!user || user.role !== "admin") {
      res.json({ success: false, message: "Not authorized." });
      return;
    }
    (req as any).adminId = user._id;
    next();
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

export default authAdmin
