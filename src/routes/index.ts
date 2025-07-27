import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/authController';
import { RoomController } from '../controllers/roomController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const authController = new AuthController();
const roomController = new RoomController();

router.get('/ping', (req: Request, res: Response) => res.json({ message: 'pong' }));
router.post('/register', (req: Request, res: Response) => authController.register(req, res));
router.post('/login', (req: Request, res: Response) => authController.login(req, res));
router.post('/rooms', authMiddleware, (req: Request, res: Response) => roomController.create(req, res));

export default router;