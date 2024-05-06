export const dynamic = "force-dynamic";

import { NextApiRequest } from "next";

export async function POST(request: NextApiRequest) {
  const result = await fetch(
    `${process.env.NEXT_API_URL}/test/storeInvestment"`,
    {
      method: "POST",
    }
  );

  const investment = await result.json();
  return new Response(JSON.stringify(investment), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
