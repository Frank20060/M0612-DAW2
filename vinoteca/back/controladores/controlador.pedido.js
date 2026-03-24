import Pedido from "../models/Pedido.js";

import nodemailer from "nodemailer";

/**
 * POST /api/pedidos
 * Crea registro y dispara email (usuario logueado)
 */
export const crearPedido = async (req, res) => {
  try {
    // Se asume que el id del usuario viene del token en req.usuari.id o req.usuari._id
    const usuarioId = req.usuari.id || req.usuari._id;
    
    // Obtenemos del body los productos y el total (o lo que se necesite)
    const { productos, total } = req.body;

    if (!productos || productos.length === 0) {
      return res.status(400).json({ error: "El pedido debe contener productos." });
    }

    // Creamos el pedido en la base de datos
    const nuevoPedido = await Pedido.create({
      usuario_id: usuarioId,
      productos,
      total,
      estado: "pendiente"
    });

    // --- Lógica para disparar email ---
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.usuari.email, // Ajustar según donde venga el email del usuario logueado
      subject: 'Confirmación de pedido creado',
      text: `¡Hola!\n\nTu pedido con ID ${nuevoPedido._id} ha sido creado exitosamente por un total de ${total}€.\n\nGracias por confiar en Vinoteca.`
    };

    await transporter.sendMail(mailOptions);
    // --- Fin lógica email ---

    // Simulamos el envío del email en consola de momento
    console.log(`Email de confirmación enviado a usuario: ${usuarioId} para el pedido: ${nuevoPedido._id}`);

    res.status(201).json({
      mensaje: "Pedido creado y mail enviado exitosamente",
      pedido: nuevoPedido
    });
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ error: "No se pudo crear el pedido." });
  }
};

/**
 * GET /api/pedidos/me
 * Lista de pedidos del usuario actual
 */
export const getMisPedidos = async (req, res) => {
  try {
    const usuarioId = req.usuari.id || req.usuari._id;

    // Buscamos los pedidos pertenecientes a este usuario
    // y hacemos populate de los productos para ver los detalles
    const pedidos = await Pedido.find({ usuario_id: usuarioId })
      .populate('productos.producto_id')
      .sort({ fecha_creacion: -1 });

    res.status(200).json({ pedidos });
  } catch (error) {
    console.error("Error al obtener mis pedidos:", error);
    res.status(500).json({ error: "No se pudieron obtener los pedidos del usuario." });
  }
};

/**
 * GET /api/pedidos
 * Lista global (Admin)
 */
export const getPedidos = async (req, res) => {
  try {
    // Buscamos todos los pedidos en la base de datos
    // hacemos populate del usuario_id y de los productos
    const pedidos = await Pedido.find()
      .populate('usuario_id', 'email rol') // Traemos algunos campos útiles del usuario
      .populate('productos.producto_id')
      .sort({ fecha_creacion: -1 });

    res.status(200).json({ pedidos });
  } catch (error) {
    console.error("Error al obtener todos los pedidos:", error);
    res.status(500).json({ error: "No se pudieron obtener todos los pedidos." });
  }
};
