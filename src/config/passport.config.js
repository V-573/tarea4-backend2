import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { userRepository } from '../repositories/user.repository.js';
import { comparePassword } from '../utils/crypto.util.js';

export const initializePassport = () => {
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
          const normalizedEmail = email.toLowerCase().trim();

          // 1. Buscar usuario en la base de datos
          const user = await userRepository.getByEmail(normalizedEmail);
          if (!user) {
            // done(error, user, info) -> Credenciales inválidas
            return done(null, false, { message: 'Usuario no encontrado' });
          }

          // 2. Validar la contraseña encriptada
          const isValidPassword = await comparePassword(password, user.password);
          if (!isValidPassword) {
            return done(null, false, { message: 'Contraseña incorrecta' });
          }

          // 3. Autenticación exitosa -> retornamos el usuario
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};