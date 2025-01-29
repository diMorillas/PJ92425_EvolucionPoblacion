const mongoose = require('../db/mongoose');

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Crear el modelo basado en el esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
