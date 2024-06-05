const express = require("express");
const {
  usersGetAll,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  recoverPasswordByEmail
} = require("../controllers/usersController");

const router = express.Router();

// Rutas para operaciones CRUD en usuarios
router.get("/get-all", usersGetAll);                   // Obtener todos los usuarios
router.get("/:id", getUserById);               // Obtener un usuario por ID
router.post("/create", createUser);                   // Crear un nuevo usuario
router.post("/login", loginUser);                    // Iniciar sesión
router.put("/update/:id", updateUser);                // Actualizar un usuario existente
router.delete("/delete/:id", deleteUser);             // Eliminar un usuario
router.post("/recover", recoverPasswordByEmail)        //recuperar contraseña

module.exports = router;

