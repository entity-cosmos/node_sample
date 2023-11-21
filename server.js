const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3000;

// Create SQLite database and table
const db = new sqlite3.Database('./data.db');
db.run('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT)');

app.use(express.json());

// CRUD routes

// Create
app.post('/notes', (req, res) => {
    const { note } = req.body;
    db.run('INSERT INTO notes (note) VALUES (?)', [note], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, note });
    });
});

// Read
app.get('/notes', (req, res) => {
    db.all(`SELECT * FROM notes `, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Update
app.put('/notes/:id', (req, res) => {
    const { note } = req.body;
    const { id } = req.params;
    db.run('UPDATE notes SET note = ? WHERE id = ?', [note, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, name });
    });
});

// Delete
app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM notes WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Item deleted', id });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
