import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { RoomService } from "../services/roomService";
import Joi from "joi";

const roomSchema = Joi.object({
    name: Joi.string().min(3).required(),
});

export class RoomController {
    private roomService: RoomService;

    constructor() {
        this.roomService = new RoomService;
    }

    async create(req: AuthenticatedRequest, res: Response) {
        try {
            const { error, value } = roomSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            const room = await this.roomService.createRoom(value.name, req.user!.id);
            res.status(201).json(room);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}