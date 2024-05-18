const { pool } = require("../db");

// Obtener todas las inscripciones
const getAllRegistrations = async (req, res) => {
    let sql = 'SELECT * FROM event_registration';
    pool.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Obtener una inscripción por ID
const getRegistrationById = async (req, res) => {
    const { id } = req.params;
    let sql = 'SELECT * FROM event_registration WHERE id = ?';
    pool.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results.length ? results[0] : null);
    });
};

// Crear una nueva inscripción
const createRegistration = async (req, res) => {
    const { user_id, event_id } = req.body;
    let sql = 'INSERT INTO event_registration (user_id, event_id, registered_at) VALUES (?, ?, NOW())';
    pool.query(sql, [user_id, event_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId });
    });
};

// Actualizar una inscripción
const updateRegistration = async (req, res) => {
    const { id } = req.params;
    const { user_id, event_id } = req.body;
    let sql = 'UPDATE event_registration SET user_id = ?, event_id = ? WHERE id = ?';
    pool.query(sql, [user_id, event_id, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Inscripción no encontrada' });
        }
        res.json({ message: 'Inscripción actualizada' });
    });
};

// Eliminar una inscripción
const deleteRegistration = async (req, res) => {
    const { id } = req.params;
    let sql = 'DELETE FROM event_registration WHERE id = ?';
    pool.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Inscripción no encontrada' });
        }
        res.json({ message: 'Inscripción eliminada' });
    });
};

module.exports = {
    getAllRegistrations,
    getRegistrationById,
    createRegistration,
    updateRegistration,
    deleteRegistration
};
