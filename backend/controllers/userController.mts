import User from "../models/userModels.mts";
import type { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerSchema = z.object({
  firstName: z.string().min(2, "FIrst name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type roleType = "user" | "admin";
const isProduction = process.env.NODE_ENV === "production";

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = registerSchema.parse(
      req.body,
    );

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json({ success: false, message: "User already exists!" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const adminEmails = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim());

    const role: roleType = adminEmails.includes(email) ? "admin" : "user";
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) throw new Error("JWT_SECRET_KEY is not defined in .env");
    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({ success: true, user: userWithoutPassword });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const loginSchema = z.object({
  email: z.string().email("Invalid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ success: false, message: "Bad credentials." });
      console.log("user not found.");
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.json({ success: false, message: "Bad credentials" });
      console.log("Wrong password.");
      return;
    }

    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) throw new Error("JWT_SECRET_KEY is not defined in .env");
    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userWithoutPassWord } = user.toObject();
    res.json({ success: true, user: userWithoutPassWord });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    res.json({ success: true, message: "Log out successfully." });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

const isAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req as any;
    if (!userId) {
      res.json({ success: false, message: "Not authorized." });
      return;
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.json({ success: false, message: "Not authorized. user not found." });
      return;
    }

    res.json({ success: true, user });
  } catch (err) {
    console.log((err as Error).message);
    res.json({ success: false, message: (err as Error).message });
  }
};

export { registerUser, login, logout, isAuth };
