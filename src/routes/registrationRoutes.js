const express = require("express");
const {
  getAllRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistration,
  deleteRegistration
} = require("../controllers/registrationController");

const router = express.Router();

router.get("/get-all", getAllRegistrations);                 // Obtener todas las inscripciones
router.get("/:id", getRegistrationById);              // Obtener una inscripción por ID
router.post("/create", createRegistration);                 // Crear una nueva inscripción
router.put("/update/:id", updateRegistration);               // Actualizar una inscripción existente
router.delete("/delete/:id", deleteRegistration);            // Eliminar una inscripción

module.exports = router;
