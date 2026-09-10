
export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const formattedErrors = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message
    }));

    return res.status(400).json({
      status: 'error',
      message: 'Error de validación en la petición',
      errors: formattedErrors
    });
  }

  req.body = result.data; // Mantiene solo los campos validados y sanitizados
  next();
};