import { Router, Request, Response, NextFunction } from "express";


const router = Router();

router.route("/")
    .get(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            res.status(200).json('Hello world');
        } catch (err) {
            next(err);
        }
    });

export default router;