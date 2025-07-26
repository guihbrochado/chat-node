import { User } from "../interfaces/user";

export class UserRepository {
    private users: User[] = [];

    async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
        const newUser: User = {
            id: Math.random().toString(36).slice(2),
            ...user,
            createdAt: new Date(),
        };
        this.users.push(newUser);
        return newUser;
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.users.find((user) => user.username === username) || null;
    }
}