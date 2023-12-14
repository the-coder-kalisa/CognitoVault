import {exportUserData} from '../controllers/userData.controller'
import {Router} from 'express'

const router = Router();

router.post("/export", exportUserData);

export default router;