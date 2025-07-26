import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app';
import { setupSocket } from './sockets/socket';

const server = createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});

setupSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
})