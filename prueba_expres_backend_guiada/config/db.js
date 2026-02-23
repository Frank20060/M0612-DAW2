//Archivo de configuración de la base de datos, donde se establecerá la conexión con MongoDB utilizando Mongoose.

/*

Dependencias que vamos instalando - Dase de datos

moongoose: Es una biblioteca de modelado de objetos MongoDB para Node.js, que proporciona una solución sencilla y elegante para interactuar con MongoDB desde una aplicación Node.js. Permite definir esquemas para los datos, realizar validaciones, y facilita la creación, lectura, actualización y eliminación de documentos en la base de datos MongoDB.
*/

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
