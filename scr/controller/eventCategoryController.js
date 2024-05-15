const { pool } = require("../db");

// Obtener todas las categorías de eventos
const categoriesGetAll = async (req, res) => {
    let sql = 'SELECT * FROM event_category';
    pool.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Obtener una categoría de evento por ID
const getCategoryById = async (req, res) => {
    const { id } = req.params;
    let sql = 'SELECT * FROM event_category WHERE id = ?';
    pool.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results.length ? results[0] : null);
    });
};

// Crear una nueva categoría de evento
const createCategory = async (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Nombre requerido" });
    }
    let sql = 'INSERT INTO event_category (name, description) VALUES (?, ?)';
    pool.query(sql, [name, description], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId });
    });
};

// Actualizar una categoría de evento
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    let sql = 'UPDATE event_category SET name = ?, description = ? WHERE id = ?';
    pool.query(sql, [name, description, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría actualizada' });
    });
};

// Eliminar una categoría de evento por ID
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    let sql = 'DELETE FROM event_category WHERE id = ?';
    pool.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json({ message: 'Categoría borrada' });
    });
};

module.exports = { categoriesGetAll, getCategoryById, createCategory, updateCategory, deleteCategory };
