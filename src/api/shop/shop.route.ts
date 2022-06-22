import { Router, Request, Response, NextFunction } from "express";

const router = Router();

import shopController from "./shop.controller";

router.route("/:filter/:limit/:offset")
    .get(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (req.params.filter)
                res.status(200).json(await shopController.productsByFilter(
                    req.params.filter.toString(), +req.params.limit, +req.params.offset));
            else
                res.status(400).json('No filter was provided');
        } catch (err) {
            next(err);
        }
    });

export default router;