const express = require("express");
const {
  getEvents,
  getEventById,
  getCreatedEventsByUser,
  getEventsByUserSuscription,
  getMainEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

const router = express.Router();

router.get("/get-events", getEvents);                          // Obtener todos los eventos
router.get("/:id", getEventById); 
router.get("/created/:user_id", getCreatedEventsByUser);                          // Obtener todos los eventos creados por un usuario
router.get("/suscriptions/:user_id", getEventsByUserSuscription); // Obtener eventos a los que un usuario se ha inscrito
router.get("/main", getMainEvents);                         // Obtener los eventos principales (los más populares
router.post("/create", createEvent);                       // Crear un nuevo evento
router.put("/update/:id", updateEvent);                     // Actualizar un evento existente
router.delete("/delete/:id", deleteEvent);                  // Eliminar un evento

module.exports = router;
