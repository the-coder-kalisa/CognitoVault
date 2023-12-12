import {Router} from 'express';
import authRouter from './auth.route'

const api = Router();

api.use('/auth', authRouter);

export default api;