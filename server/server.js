const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('./listatareas.db', (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos SQLite.');
  }
});

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS tareas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  descripcion TEXT NOT NULL,
  completada INTEGER DEFAULT 0
)`);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Agregar tarea
app.post('/tareas', (req, res) => {
  const { descripcion } = req.body;
  if (!descripcion) {
    return res.status(400).json({ error: 'La descripción es obligatoria.' });
  }
  const query = `INSERT INTO tareas (descripcion) VALUES (?)`;
  db.run(query, [descripcion], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID, descripcion, completada: 0 });
  });
});

// Obtener todas las tareas
app.get('/tareas', (req, res) => {
  const query = `SELECT * FROM tareas`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ tareas: rows });
  });
});

// Eliminar tarea
app.delete('/tareas/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM tareas WHERE id = ?`;
  db.run(query, id, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Tarea eliminada correctamente' });
  });
});

// Actualizar estado de completada de una tarea
app.put('/tareas/:id', (req, res) => {
  const { id } = req.params;
  const { completada } = req.body;
  const query = `UPDATE tareas SET completada = ? WHERE id = ?`;

  if (completada === undefined) {
    return res.status(400).json({ error: 'El campo completada es obligatorio.' });
  }

  db.run(query, [completada, id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Tarea actualizada correctamente' });
  });
});
