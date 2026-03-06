module.exports = {
  // Nombre de rounds pour bcrypt (10 = standard)
  saltRounds: 10,
  
  // Configuration session
  session: {
    secret: process.env.SESSION_SECRET || 'marsai-secret-key-change-in-production',
    name: 'marsai.sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // HTTPS uniquement en prod
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 heures
      sameSite: 'lax'
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