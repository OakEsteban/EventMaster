const express = require("express");
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

const router = express.Router();

router.get("/get-all", getEvents);                          // Obtener todos los eventos
router.get("/:id", getEventById);                    // Obtener un evento por ID
router.post("/create", createEvent);                       // Crear un nuevo evento
router.put("/update/:id", updateEvent);                     // Actualizar un evento existente
router.delete("/delete/:id", deleteEvent);                  // Eliminar un evento

module.exports = router;
