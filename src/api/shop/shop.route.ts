import { Router, Request, Response, NextFunction } from "express";
import * as items from './shop.json'

const router = Router();

router.route("/")
    .get(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.status(200).json(items.filter(item => item.name.includes(req.query.filter.toString())));
        } catch (err) {
            next(err);
        }
    });

export default router;