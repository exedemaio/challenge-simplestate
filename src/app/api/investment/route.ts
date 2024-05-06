export const dynamic = "force-dynamic";

import { NextApiRequest } from "next";

export async function POST(request: NextApiRequest) {
  const body = request.body;
  const result = await fetch(
    `${process.env.NEXT_API_URL}/test/simulateInvestment`,
    {
      method: "POST",
      body: JSON.stringify({
        model_id: body.model_id || "",
        currency_id: body.currency_id || "",
        amount: body.amount || "",
      }),
    }
  );

  const investment = await result.json();
  return new Response(JSON.stringify(investment), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
