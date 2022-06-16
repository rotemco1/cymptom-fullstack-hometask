import * as express from "express";
import shopRoute from "./shop/shop.route";

const router = express.Router();

router.use('/shop', shopRoute);

export default router;