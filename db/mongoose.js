const mongoose = require('mongoose');

// URL de conexión
const mongoURI = 'mongodb://localhost:27017/Users';

// Conexión con MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado con éxito'))
  .catch((err) => console.error('Error al conectar con MongoDB:', err));

module.exports = mongoose;
