import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();
const authController = new AuthController();

router.get('/ping', (req: Request, res: Response) => res.json({ message: 'pong' }));
router.post('/register', (req: Request, res: Response) => authController.register(req, res));
router.post('/login', (req: Request, res: Response) => authController.login(req, res));

export default router;