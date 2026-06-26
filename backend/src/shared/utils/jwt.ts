import { Payload } from "../types/authTypes";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const signAccessToken = (payload: Payload) =>
  jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

export const signRefreshToken = (payload: Payload) =>
  jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, ACCESS_TOKEN_SECRET);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_TOKEN_SECRET);

export const REFRESH_TOKEN_EXPIRES_MS = 7 * 24 * 60 * 60 * 1000;
