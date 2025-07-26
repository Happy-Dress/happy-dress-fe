const express = require('express');
const path = require('path');
const app = express();

// Middleware для статических файлов
app.use(express.static(path.join(__dirname, 'dist')));

// Базовый роут
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Все остальные роуты
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
});