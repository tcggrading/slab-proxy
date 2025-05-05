const fetch = require('node-fetch');

export default async function handler(req, res) {
  const { serial } = req.query;

  if (!serial) {
    return res.status(400).json({ error: 'Missing serial number' });
  }

  try {
    const response = await fetch(`https://scd1vdubva5webe4.public.blob.vercel-storage.com/slabs/${serial}.json`);

    if (!response.ok) {
      return res.status(404).json({ error: 'Slab not found' });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}

