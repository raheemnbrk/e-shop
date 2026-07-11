import { NextFunction, Request, Response } from "express";
import { addReviewInput } from "../../shared/types/productTypes";
import { addReviewServices } from "./reviewServices";
import { addReviewSchema } from "../../shared/validations/reviewValidations";

export const addReviewController = async (
  req: Request<{ productId: string }, {}, addReviewInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;
    const { productId } = req.params;

    const input = addReviewSchema.parse(req.body);

    const { message } = await addReviewServices(userId, productId, input);

    return res.status(201).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};
