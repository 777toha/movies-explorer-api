import { Router, Request, Response } from 'express';

const cookieRouter = Router();

cookieRouter.get('/check-cookie', (req: Request, res: Response) => {
  const cookie = req.cookies.jwt;
  if (cookie) {
    res.send({ valid: true });
  } else {
    res.send({ valid: false });
  }
});

export default cookieRouter;
