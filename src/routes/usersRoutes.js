const express = require("express");
const {
  usersGetAll,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/usersController");

const router = express.Router();

// Rutas para operaciones CRUD en usuarios
router.get("/get-all", usersGetAll);                   // Obtener todos los usuarios
router.get("/:id", getUserById);               // Obtener un usuario por ID
router.post("/create", createUser);                   // Crear un nuevo usuario
router.put("/update/:id", updateUser);                // Actualizar un usuario existente
router.delete("/delete/:id", deleteUser);             // Eliminar un usuario

module.exports = router;

