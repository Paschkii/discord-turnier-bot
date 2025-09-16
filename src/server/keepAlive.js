// === Webserver wach halten (Render.com) ===
function keepAlive() {
    const express = require('express');
    // === Webserver (Keep-Alive) ===
    const app = express();
    const PORT = process.env.PORT || 3000;
    if (!process.env.PORT) console.warn('⚠️ Kein PORT von Render gesetzt – default 3000');
    app.get('/', (_, res) => res.status(200).send('OK'));
    app.get('/health', (_, res) => res.status(200).send('OK'));
    app.listen(PORT, () => console.log(`Webserver listening on port ${PORT}`));
}

// === Exports ===
module.exports = { keepAlive };