const mongoose = require('../db/mongoose');

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const postSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

// Crear el modelo basado en el esquema
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', userSchema);

module.exports = User;
