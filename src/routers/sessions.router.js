import {Router} from 'express';
import passport from 'passport';
import {getCurrentUser, login, logout, register} from '../controllers/session.controller.js'
import { validateBody } from '../middlewares/validate.meddleware.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';
// import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();
// Flujo de Registro: Zod -> Passport ('register') -> Controller
router.post('/register',
     validateBody(registerSchema),
     passport.authenticate('register', {session:false}),
      register);

// Flujo: 1. Valida formato (Zod) -> 2. Autentica usuario/password (Passport) -> 3. Responde/Cookie (Controller)
router.post('/login', 
    validateBody(loginSchema),
    passport.authenticate('login', {session: false}),
    login);


// Ruta protegida: authMiddleware se ejecuta primero
router.get('/current',
    //  authMiddleware, - el middleware se deja de usar y se reemplaza por funcionalidad de passport
    passport.authenticate('jwt', {session:false}),
      getCurrentUser);

router.post('/logout', logout);

export default router;
