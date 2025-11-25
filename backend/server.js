const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Criar/abrir o arquivo do banco
const path = require("path");
const db = new sqlite3.Database(path.join(__dirname, "database.sqlite"));

// Criar tabela de clientes se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    telefone TEXT,
    cpf TEXT
  )
`);

app.get("/", (req, res) => {
    res.send("API funcionando!");
});

// Cadastrar Cliente
app.post("/clientes", (req, res) => {
    const { nome, email, telefone, cpf } = req.body;

    db.run(
        `INSERT INTO clientes (nome, email, telefone, cpf) VALUES (?, ?, ?, ?)`,
        [nome, email, telefone, cpf],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ id: this.lastID, nome, email, telefone, cpf });
        }
    );
});

// Listar Cliente
app.get("/clientes", (req, res) => {
    db.all(`SELECT * FROM clientes`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(rows);
    });
});

// Deletar Cliente
app.delete("/clientes/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM clientes WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    if (this.changes === 0) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    res.json({ message: "Cliente deletado com sucesso." });
  });
});


app.listen(3000, () => console.log("Servidor rodando na porta 3000"));