import { Server, Socket } from "socket.io";
import jwt from 'jsonwebtoken';
import { config } from '../config/env'
import { ChatMessage } from "../interfaces/chatMessage";
import logger from "../utils/logger";

export function setupSocket(io: Server) {
    io.use((socket: Socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }
        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            socket.data.user = decoded;
            next();
        } catch (error) {
            next(new Error('Invalid token'));
        }
    });

    io.on('connection', (socket: Socket) => {
        logger.info(`New client connected: ${socket.id}, User: ${socket.data.user.username}`);

        socket.on('joinRoom', (roomId: string) => {
            socket.join(roomId);
            logger.info(`User ${socket.data.user.username} joined room ${roomId}`);
        });

        socket.on('chatMessage', ({ roomId, message }: ChatMessage) => {
            io.to(roomId).emit('chatMessage', {
                message,
                sender: socket.data.user.username,
                timestamp: new Date(),
            });
        });

        socket.on('disconnect', () => {
            logger.info(`cliente disconnected: ${socket.id}`);
        });
    });
}