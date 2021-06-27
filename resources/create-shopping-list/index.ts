const AWS = require("aws-sdk");
const faunadb = require("faunadb"),
  q = faunadb.query;

const API_KEY = process.env.API_KEY;

export const handler = async (event: any = {}): Promise<any> => {
  console.log(event.body);

  let client = new faunadb.Client({secret: API_KEY, keepAlive: false});

  await client.query(q.Create(q.Collection('shopping_lists'), {data: event.body}))

  return {
    statusCode: 201,
    body: "Shopping list created",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };
}
