import mongoose from 'mongoose';    // Cargamos Mongoose para definir el esquema y modelo de Usuario
import bcrypt from 'bcryptjs';  // bcryptjs es una biblioteca para hashear contraseñas de forma segura. La usaremos para proteger las contraseñas de los usuarios antes de guardarlas en la base de datos. (npm install bcryptjs)

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'L\'email és obligatori'],
    unique: true,    // garantiza que no haya dos usuarios con el mismo email
    trim: true,
    lowercase: true // convierte el email a minúsculas para evitar problemas de mayúsculas/minúsculas en la autenticación
  },
  password: {
    type: String,
    required: [true, 'La contrasenya és obligatòria'],
    minlength: 6,
    select: false    // no incluir la contraseña por defecto en las consultas (a menos que se especifique explícitamente) para mayor seguridad (un find no la pilla)
  },
  rol: {
    type: String,
    enum: ['usuari', 'admin'],
    default: 'usuari'
  }
}, { timestamps: true });

// Middleware pre('save'): antes de guardar un usuario, hasheamos la contraseña si ha sido modificada o es nueva. Esto asegura que nunca se guarde una contraseña en texto plano en la base de datos.
// Solo se hashea la contraseña si ha sido modificada (o es nueva), lo que permite actualizar otros campos del usuario sin rehashear la contraseña si no ha cambiado.
usuarioSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);  // hashea la contraseña con un salt de 10 rondas (puedes ajustar el número de rondas para mayor seguridad, pero ten en cuenta que aumentará el tiempo de hash)
});

// Método para comparar una contraseña candidata con la contraseña hasheada almacenada en la base de datos. Esto se usará durante el proceso de autenticación para verificar que la contraseña ingresada por el usuario coincide con la contraseña almacenada.
usuarioSchema.methods.comprovarPassword = function (candidat) {
  return bcrypt.compare(candidat, this.password);
};

export default mongoose.model('Usuario', usuarioSchema);
