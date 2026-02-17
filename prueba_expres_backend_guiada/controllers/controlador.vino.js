import express from "express";

/*
Aqui se ponen las funciones que luego se llamaran desde las rutas, 
para mantener el codigo organizado y separado por responsabilidades.

*/
const vinito = [
  {
    id: 1,
    nombre: "Vinito tinto",
    precio: 10,
  },
  {
    id: 2,
    nombre: "Vinito blanco",
    precio: 12,
  },
  {
    id: 3,
    nombre: "Vinito rosado",
    precio: 8,
  },
  {
    id: 4,
    nombre: "Vinito verde",
    precio: 11,
  },
];

export function leerTodosLosVinito(req, res) {
  console.log("Has llamado a la función leerTodosLosVinito");
  // Aquí iría la lógica para leer todos los vinito de la base de datos

  console.log("Vinito leidos: ", vinito);
  res.json(vinito);
}

export function vinitoID(req, res) {
  const id = req.params.id;
  console.log("Has llamado a la función vinitoID con el id: ", id);
  const vino = vinito.find((v) => v.id === parseInt(id));
  if (vino) {
    res.json(vino);
  } else {
    res.status(404).json({ message: "Vinito no encontrado" });
  }
}


