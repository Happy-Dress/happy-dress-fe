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

app.use((req, res, next) => {
    // Для JS-файлов
    if (req.path.endsWith('.js')) {
        res.type('application/javascript');
    }
    // Для CSS-файлов
    if (req.path.endsWith('.css')) {
        res.type('text/css');
    }
    next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started: http://localhost:${PORT}`);
});