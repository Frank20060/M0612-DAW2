import mongoose from 'mongoose';

// Funció asíncrona que connecta a MongoDB mitjançant la URI del .env
const connectDB = async () => {
  try {
    // mongoose.connect retorna una promesa; la URI conté host, usuari, password i nom de la BD
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connectat');
  } catch (err) {
    console.error('Error connectant a MongoDB:', err.message);
    // Sortir del procés si no es pot connectar (evitar arrencar l'API sense BD)
    process.exit(1);
  }
};

export default connectDB;
