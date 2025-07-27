import { User } from "../interfaces/user";
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema<User>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const UserModel = model<User>('User', userSchema);

export class UserRepository {
    async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
        const newUser = new UserModel({ ...user, createdAt: new Date() });
        await newUser.save();
        return { id: newUser._id.toString(), ...newUser.toObject() };
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await UserModel.findOne({ username });
        return user ? {id: user._id.toString(), ...user.toObject() } : null;
    }
}