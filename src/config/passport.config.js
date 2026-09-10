import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { userService } from '../services/user.service.js';

export const initializePassport = () => {
    // Estrategia de login
  passport.use(
    'login',
    new LocalStrategy(
      {
        // Reasignamos el nombre del campo a 'email' (por defecto Passport busca 'username')
        usernameField: 'email',
        passwordField: 'password',
        session: false // Desactivamos sesiones persistentes (ya que usamos JWT)
      },
      async (email, password, done) => {
        try {
             // 1. Buscar usuario en la base de datos
          const result = await userService.loginUser({email, password});
      
          return done(null, result);
        } catch (error) {
 //return done(null, false, { message: error.message });

 console.log(error.message) // puedo capturar el error desde service pero aun no logro enviarlopor done...
        // return done(null, false, {message: error.message});
        return done(error);
        }
       
      }
    )
  );

  // Estrategia de Registro
  passport.use(
    'register',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true, // Permite acceder a req.body para leer first_name, last_name, etc.
        session: false
      },
      async (req, email, password, done) => {
        try {
          // Delegamos la creación al Service existente
          const newUser = await userService.registerUser(req.body);
          
          // Si fue exitoso, pasamos el usuario creado a Passport
          return done(null, newUser);
        } catch (error) {
          // Captura errores de negocio (ej. 409 Email ya registrado) y los pasa a Passport
          return done(error);
        }
      }
    )
  );


};

