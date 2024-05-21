const { pool } = require("../db");
const bcrypt = require('bcrypt');
const saltRounds = 10;  // Puedes ajustar la complejidad del hash aquí

// Obtener todos los usuarios
const usersGetAll = async (req, res) => {
    let sql = 'SELECT * FROM users';
    pool.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    let sql = 'SELECT * FROM users WHERE id = ?';
    pool.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results.length ? results[0] : null);
    });
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Clave requerida" });
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        let sql = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
        pool.query(sql, [username, email, hash], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: results.insertId });
        });
    });
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        let sql = 'UPDATE users SET username = ?, email = ?, password_hash = ? WHERE id = ?';
        pool.query(sql, [username, email, hash, id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            res.json({ message: 'Usuario actualizado' });
        });
    });
};

// Eliminar un usuario por ID
const deleteUser = async (req, res) => {
    const { id } = req.params;
    let sql = 'DELETE FROM users WHERE id = ?';
    pool.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario borrado' });
    });
};

module.exports = { usersGetAll, getUserById, createUser, updateUser, deleteUser };
