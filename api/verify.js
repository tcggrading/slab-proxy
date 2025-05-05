export const config = {
  runtime: 'edge',
};

export default async function handler(req, res) {
  const { serial } = req.query;

  console.log('Serial received:', serial); // <-- Add this for debugging

  if (!serial) {
    console.log('Missing serial');
    return res.status(400).json({ error: 'Missing serial number' });
  }

  try {
    const url = `https://scd1vdubva5webe4.public.blob.vercel-storage.com/slabs/${serial}.json`;
    console.log('Fetching URL:', url); // <-- Add this for debugging

    const response = await fetch(url);

    console.log('Response status:', response.status);

    if (!response.ok) {
      console.log('Slab not found');
      return res.status(404).json({ error: 'Slab not found' });
    }

    const data = await response.json();
    console.log('Data fetched:', data);

    return res.status(200).json(data);

  } catch (error) {
    console.error('Catch Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
