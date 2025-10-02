const express = require('express');
const router = express.Router();

const {getAllUsuarios, getUsuariosById, deleteUsuario, updateUsuarios} = require("../controllers/usuariosController")

//Ruta para obtener todos los usuarios
router.get("/", getAllUsuarios);

//Ruta para obtener los usuarios por id
router.get("/:id", getUsuariosById);

//Ruta para actualizar un usuario
router.put('/:id', updateUsuarios)

//Ruta para obtener los usuarios por id
router.delete("/:id", deleteUsuario);

module.exports = router;

