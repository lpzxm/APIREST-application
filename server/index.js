const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas para obtener usuarios
app.get('/api/usuarios', async (req, res) => {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
});

// Ruta para crear un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
    const { nombre, email } = req.body;
    try {
        const newUser = await prisma.usuario.create({
            data: { nombre, email },
        });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
