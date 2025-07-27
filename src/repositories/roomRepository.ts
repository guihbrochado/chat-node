import { Room } from "../interfaces/room";

export class RoomRepository {
    private rooms: Room[] = [];

    async create(room: Omit<Room, 'id' | 'createdAt'>): Promise<Room> {
        const newRoom: Room = {
            id: Math.random().toString(36).slice(2),
            ...room,
            createdAt: new Date(),
        };
        this.rooms.push(newRoom);
        return newRoom;
    }

    async findById(id: string): Promise<Room | null> {
        return this.rooms.find((room) => room.id === id) || null;
    }
}