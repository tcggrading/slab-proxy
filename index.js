const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/serial/:serialNumber', async (req, res) => {
  const { serialNumber } = req.params;
  const url = `https://raw.githubusercontent.com/tcggrading/tcg-slab-verification/main/data/${serialNumber}.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(404).json({ error: 'Slab not found' });
    }
    const data = await response.json();

    // Allow CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
