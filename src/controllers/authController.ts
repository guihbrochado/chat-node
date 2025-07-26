import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import Joi from 'joi';

const authSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response) {
    try {
      const { error, value } = authSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const token = await this.authService.register(value.username, value.password);
      res.status(201).json({ token });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { error, value } = authSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const token = await this.authService.login(value.username, value.password);
      res.json({ token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}