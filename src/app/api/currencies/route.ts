export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const result = await fetch(`${process.env.NEXT_API_URL}/test/getCurrencies`);

  const currencies = await result.json();
  return new Response(JSON.stringify(currencies), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
