import express from 'express';
import { createOrder, getLatestOrder } from '../controllers/Order.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/latest', getLatestOrder);

export default router;