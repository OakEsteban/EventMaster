const express = require('express');
const { sendEmail } = require("../controllers/emailController");

const router = express.Router();

// Define la ruta para enviar correos electrónicos
router.post("/send", sendEmail); 

module.exports = router;
