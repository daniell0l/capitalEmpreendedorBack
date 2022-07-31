/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  res.send({ message: "OK" });
});

export default router;