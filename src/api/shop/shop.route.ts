import { Router, Request, Response, NextFunction } from "express";
import * as config from '../../config/config.json';

const router = Router();

import shopController from "./shop.controller";

router.route("/")
    .get(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (req.query.filter)
                res.status(200).json(await shopController.productsByFilter(req.query.filter.toString()));
            else
                res.status(400).json('No filter was provided');
        } catch (err) {
            next(err);
        }
    });

export default router;