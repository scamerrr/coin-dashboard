let total = 0;
let lastInserted = 0;

export async function POST(request) {
  const body = await request.json();
  const { value } = body;

  total += value;
  lastInserted = value;

  return new Response(JSON.stringify({ message: "Coin inserted", total }), { status: 200 });
}

export async function GET() {
  return new Response(JSON.stringify({ total, lastInserted }), { status: 200 });
}