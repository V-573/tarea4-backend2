import { CustomError } from "../utils/customError.util.js";
import { verifyToken } from "../utils/jwt.util.js";

export const authMiddleware = (req, res, next)=>{
    try {
        // 1. Intentar obtener la cookie (revisa si existe)
    const token = req.cookies?.token || req.cookies?.currentUser;

    if (!token) {
      throw new CustomError('No autorizado: Token no proporcionado', 401);
    }

    // 2. Verificar el token usando el utilitario de JWT
    const decodedPayload = verifyToken(token);

    // 3. Adjuntar la información del usuario a la petición
    req.user = decodedPayload;

    next(); // Continuar a la siguiente función/controlador
        
    } catch (error) {
        // Si el token expiró o fue manipulado, JsonWebTokenError o TokenExpiredError lanzarán excepción
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new CustomError('No autorizado: Token inválido o expirado', 401));
    }
    next(error);
    }
}