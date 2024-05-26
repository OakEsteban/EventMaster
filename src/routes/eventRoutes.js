const express = require("express");
const {
  getEvents,
  getEventById,
  getCreatedEventsByUser,
  getEventsByUserSuscription,
  createEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

const router = express.Router();

router.get("/get-events", getEvents);                          // Obtener todos los eventos
router.get("/:id", getEventById); 
router.get("/created/:userId", getCreatedEventsByUser);                          // Obtener todos los eventos creados por un usuario
router.get("/suscriptions/:userId", getEventsByUserSuscription); // Obtener eventos a los que un usuario se ha inscrito
router.post("/create", createEvent);                       // Crear un nuevo evento
router.put("/update/:id", updateEvent);                     // Actualizar un evento existente
router.delete("/delete/:id", deleteEvent);                  // Eliminar un evento

module.exports = router;
