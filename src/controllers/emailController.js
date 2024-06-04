const nodemailer = require('nodemailer');

// Configura el transporte de correo usando SMTP
let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Controlador para enviar el correo
const sendEmail = (req, res) => {
    const { to } = req.body;

    const verificationCode = Math.floor(Math.random() * 10000); // Genera un número aleatorio entre 0 y 9999
    // Configura las opciones del correo
    let mailOptions = {
        from: `"Event master" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Su código de verificación',
        html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            <p style="font-size: 18px; font-weight: bold;">Hola,</p>
            <p style="font-size: 18px;">Su código de verificación es: <strong>${verificationCode}</strong></p>
        </div>`    
    };

    // Envía el correo con el objeto de transporte definido
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error enviando el correo:', error);
            return res.status(500).json({ error: 'Error enviando el correo' });
        }
        console.log('Correo enviado: %s', info.messageId);
        res.status(200).json({ verificationCode: verificationCode });
    });
};

module.exports = { sendEmail };
