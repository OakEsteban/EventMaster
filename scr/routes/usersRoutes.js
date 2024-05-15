const express = require("express");
const { usersGetAll } = require("../controller/usersController");
const router = express.Router();

// Requiere el controlador de usuarios
require("../controller/usersController");

router.get("/get-all", usersGetAll);

module.exports = router;
