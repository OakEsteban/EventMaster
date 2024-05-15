const { pool } = require("../db");

// Obtener todos los eventos
const getEvents = async (req, res) => {
    let sql = 'SELECT * FROM events';
    pool.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Obtener un evento por ID
const getEventById = async (req, res) => {
    const { id } = req.params;
    let sql = 'SELECT * FROM events WHERE id = ?';
    pool.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results.length ? results[0] : null);
    });
};

// Crear un nuevo evento
const createEvent = async (req, res) => {
    const { title, description, date, time, location, event_category_id, user_id } = req.body;
    let sql = 'INSERT INTO events (title, description, date, time, location, event_category_id, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
    pool.query(sql, [title, description, date, time, location, event_category_id, user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId });
    });
};

// Actualizar un evento
const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, date, time, location, event_category_id, user_id } = req.body;
    let sql = 'UPDATE events SET title = ?, description = ?, date = ?, time = ?, location = ?, event_category_id = ?, user_id = ?, updated_at = NOW() WHERE id = ?';
    pool.query(sql, [title, description, date, time, location, event_category_id, user_id, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json({ message: 'Evento actualizado' });
    });
};

// Eliminar un evento
const deleteEvent = async (req, res) => {
    const { id } = req.params;
    let sql = 'DELETE FROM events WHERE id = ?';
    pool.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.json({ message: 'Evento eliminado' });
    });
};

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent };
