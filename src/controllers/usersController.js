const { pool } = require("../db");
const jwt = require('jsonwebtoken');
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

// Iniciar Sesión
const loginUser = async (req, res) => {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
        return res.status(400).json({ error: "Nombre de usuario/email y clave requeridos" });
    }

    // Consulta para obtener el usuario por username o email
    let sql = 'SELECT * FROM users WHERE username = ? OR email = ?';
    pool.query(sql, [identifier, identifier], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: "Usuario o clave incorrectos" });
        }

        const user = results[0];

        // Comparar la clave ingresada con el hash almacenado
        bcrypt.compare(password, user.password_hash, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!result) {
                return res.status(401).json({ error: "Usuario o clave incorrectos" });
            }
            
            const userForToken = {
                id: user.id,
                username: user.username
            }
            // Crear un token JWT
            const token = jwt.sign(userForToken, process.env.SECRET_KEY, { expiresIn: '1h' });
            // Enviar el token en la respuesta
            res.status(200).json(
                {
                    success: true,
                    message: 'Inicio de sesión exitoso',
                    token: token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                }
            );
        });
    });
}

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

// Actualizar contraseña
const recoverPasswordByEmail = async (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        let sql = 'UPDATE users SET password_hash = ? WHERE email = ?';
        pool.query(sql, [hash, email], (err, results) => {
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

module.exports = { usersGetAll, getUserById, createUser, loginUser, updateUser, deleteUser, recoverPasswordByEmail };
