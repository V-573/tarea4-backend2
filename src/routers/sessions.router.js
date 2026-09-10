import {Router} from 'express';
import passport from 'passport';
import {getCurrentUser, login, logout, register} from '../controllers/session.controller.js'
import { validateBody } from '../middlewares/validate.meddleware.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', validateBody(registerSchema), register);

// Flujo: 1. Valida formato (Zod) -> 2. Autentica usuario/password (Passport) -> 3. Responde/Cookie (Controller)
router.post('/login', 
    validateBody(loginSchema),
    passport.authenticate('login', {session: false}),
    login);


// Ruta protegida: authMiddleware se ejecuta primero
router.get('/current', authMiddleware, getCurrentUser);

router.post('/logout', logout);

export default router;
