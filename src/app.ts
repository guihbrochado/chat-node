import express from 'express';
import cors from 'cors';
import routes from './routes';
import { config } from './config/env';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

export default app;