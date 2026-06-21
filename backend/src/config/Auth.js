module.exports = {
  // Nombre de rounds pour bcrypt (10 = standard)
  saltRounds: 10,
  
  // Configuration session
  session: {
    secret: process.env.SESSION_SECRET,
    name: 'marsai.sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: ['production', 'deployment'].includes(process.env.NODE_ENV),
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'strict'
    }
  },
  
  // Validation password
  password: {
    minLength: 8,
    requireUppercase: true,
    requireNumber: true,
    requireSpecialChar: false
  }
};