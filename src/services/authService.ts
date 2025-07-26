import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository';
import { config } from '../config/env';

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(username: string, password: string): Promise<string> {
        const existingUser = await this.userRepository.findByUsername(username);
        if (existingUser) {
            throw new Error('Username already exists');
        }
        const hashadPassword = await bcrypt.hash(password, 10);
        const user = await this.userRepository.create({ username, password: hashadPassword });
        return jwt.sign({id: user.id, username: user.username}, config.jwtSecret, {expiresIn: '1h'});
    }

    async login(username: string, password: string): Promise<string> {
        const user = await this.userRepository.findByUsername(username);
        if(!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        return jwt.sign({ id:user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });
    }
}