const { pool } = require("../db");

// Obtener todos los eventos con filtros
const getEvents = async (req, res) => {
    const { title, date, location, category } = req.query;

    let sql = `SELECT ev.id,
            ev.title,
            ev.date,
            ev.location,
            ev.description,
            ec.name as category,
            ev.time,
            ev.user_id
            FROM events ev 
            INNER JOIN event_category ec ON ec.id = ev.event_category_id where 1=1`
    const params = [];

    if (title) {
        sql += ' AND title LIKE ?';
        params.push(`%${title}%`);
    }
    if (date) {
        sql += ' AND date = ?';
        params.push(date);
    }
    if (location) {
        sql += ' AND location LIKE ?';
        params.push(`%${location}%`);
    }
    if (category) {
        sql += ' AND event_category_id = ?';
        params.push(category);
    }

    pool.query(sql,params, (err, results) => {
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

// Obtener todos los eventos creados por un usuario
const getCreatedEventsByUser = async (req, res) => {
    const { user_id } = req.params;
    let sql = 'SELECT * FROM events WHERE user_id = ?';
    pool.query(sql, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Obtener eventos a los que un usuario se ha inscrito
const getEventsByUserSuscription = async (req, res) => {
    const { user_id } = req.params;
    let sql = 'SELECT e.* FROM events e JOIN event_registration s ON e.id = s.event_id WHERE s.user_id = ?';
    pool.query(sql, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
}

//Obtener los principales eventos los cuales son los  10 eventos que tienen mas inscripciones 
const getMainEvents = async (req, res) => {
    const sql = `
        SELECT e.*, COUNT(s.id) as registrations_count
        FROM events e
        JOIN event_registration s ON e.id = s.event_id
        GROUP BY e.id
        ORDER BY registrations_count DESC
        LIMIT 10
    `;

    pool.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Verifica si results es un array
        if (Array.isArray(results) && results.length > 0) {
            res.json(results);
        } else {
            res.status(404).json({ message: 'No main events found' });
        }
    });
}


// Crear un nuevo evento
const createEvent = async (req, res) => {
    const { title, description, date, time, location, event_category_id, user_id } = req.body;
    let sql = 'INSERT INTO events (title, description, date, time, location, event_category_id, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
    console.log(req.body.user_id)
    console.log(req.body)
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

module.exports = { 
    getEvents, 
    getEventById,
    getCreatedEventsByUser,
    getEventsByUserSuscription, 
    getMainEvents,
    createEvent, 
    updateEvent, 
    deleteEvent };
