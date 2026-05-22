require('dotenv').config()
const express = require('express')
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Usar el router para manejar las rutas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//Para la comunicacion con la logica
app.use(express.json());

// Corremos el servidor
app.listen(PORT, () => {
  console.log(`Server corriendo en: http://localhost:${PORT}`);
});