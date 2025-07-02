import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  private authService = new AuthService();

  requestLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      await this.authService.requestLogin(email);
      res.status(200).json({ status: true, message: 'OTP sent to your email', data: null });
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Failed to request login' });
    }
  };

  verifyLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, code } = req.body;
      const { token, user } = await this.authService.verifyLogin(email, code);
      res.status(200).json({ status: true, message: 'code verified successfully!', data: { token, user } });
    } catch (error: any) {
      res.status(401).json({ message: error.message || 'OTP verification failed' });
    }
  };
}
