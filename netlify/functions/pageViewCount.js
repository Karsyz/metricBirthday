import { connectLambda, getStore } from "@netlify/blobs";

export async function handler(event, context) {
  connectLambda(event);

  const page = getStore("page");

  const count = await page.get("viewCounter");
  const countNum = Number(count) + 1;
  await page.set("viewCounter", JSON.stringify(countNum));

  return {
    statusCode: 200,
    body: countNum.toString(),
  };
}
