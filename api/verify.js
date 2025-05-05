export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const serial = searchParams.get('serial');

  if (!serial) {
    return new Response(JSON.stringify({ error: 'Missing serial number' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const fetchUrl = `https://scd1vdubva5webe4.public.blob.vercel-storage.com/slabs/${serial}.json`;

    const response = await fetch(fetchUrl);

    if (!response.ok) {
      console.log('Fetch failed with status:', response.status);
      return new Response(JSON.stringify({ error: 'Slab not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Catch error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

