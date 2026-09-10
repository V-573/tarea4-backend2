import { userService } from "../services/user.service.js";
import { generateToken } from "../utils/jwt.util.js";

export const register = async (req, res, next) => {
  try {
    const userPayload = await userService.registerUser(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado correctamente',
      payload: userPayload
    });
  } catch (error) {
    // Pasa el error al middleware global de errores
    // res.status(error.statusCode || 500).json({
    //   status: 'error',
    //   message: error.message || 'Error interno del servidor'
    // });
next(error);

  }
};

export const login = async (req, res, next) => {
  try {


         // const { user, token } = await userService.loginUser(req.body);

         // req.user ya fue adjuntado por Passport tras verificar con bcrypt y la BD
    const user = req.user;

    // Crear el payload y firmar el JWT
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role
    });

    res.cookie('token', token,{
      httpOnly: true,
      secure:process.env.NODE_ENV === 'production',
      maxAge: 24*60*60*1000
    });


    res.status(200).json({
      status: 'success',
      message: 'Inicio de sesión exitoso',
      payload: user
    });
  } catch (error) {
    // res.status(error.statusCode || 500).json({
    //   status: 'error',
    //   message: error.message || 'Error interno del servidor'
    // });
    next(error);
  }
};


// GET /api/sessions/current
export const getCurrentUser = async (req, res, next) => {
  try {
    // req.user ya fue cargado previamente por authMiddleware
    res.status(200).json({
      status: 'success',
      payload: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    next(error);
  }
};



export const logout = async (req, res, next) => {
try {
    // Limpia la cookie especificando el mismo nombre con el que se creó
    res.clearCookie('token'); 
    res.clearCookie('currentUser'); // Si usaste este nombre

    res.status(200).json({
      status: 'success',
      message: 'Sesión cerrada correctamente'
    });
  } catch (error) {
    next(error);
  }
};



