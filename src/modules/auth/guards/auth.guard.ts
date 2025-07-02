import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const authGuard = passport.authenticate('jwt', { session: false });

export const injectUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) return next();
  return res.status(401).json({ message: 'Unauthorized' });
};
