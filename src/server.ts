import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app';
import { setupSocket } from './sockets/socket';
import { config } from './config/env';
import logger from './utils/logger';

const server = createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});

setupSocket(io);

server.listen(config.port, () => {
    logger.info(`Server Running on http://localhost:${config.port}`);
})