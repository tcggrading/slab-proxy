import fetch from 'node-fetch';

export default async function handler(req, res) {
  const {
    query: { serial },
  } = req;

  const url = `https://raw.githubusercontent.com/tcggrading/tcg-slab-verification/main/data/${serial}.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(404).json({ error: 'Slab not found' });
    }
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
