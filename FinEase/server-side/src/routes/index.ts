import express, { Request, Response } from 'express';

const router = express.Router();
router.get('/', index);

export default router;


async function index(req: Request, res: Response) {
  return res.render('index', {
    title: 'FinEase API'
  });
}