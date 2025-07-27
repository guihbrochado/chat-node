import { RoomRepository } from "../repositories/roomRepository";
import { Room } from "../interfaces/room";

export class RoomService {
    private roomRepository: RoomRepository;

    constructor() {
        this.roomRepository = new RoomRepository();
    }

    async createRoom(name: string, creatorId: string): Promise<Room> {
        return this.roomRepository.create({ name, creatorId });
    }

    async getRoom(id: string): Promise<Room | null> {
        return this.roomRepository.findById(id);
    }
}