const AWS = require("aws-sdk");
const faunadb = require("faunadb"),
  q = faunadb.query;

const API_KEY = process.env.API_KEY;

export const handler = async (event: any = {}): Promise<any> => {
  const id = event.pathParameters.mealID;
  const mealType = event.pathParameters.mealType;

  if (!id) {
    return {
      statusCode: 404,
      body: `Error: You are missing the mealID parameter`
    };
  }

  let client = new faunadb.Client({ secret: API_KEY, keepAlive: false });

  let { data } = await client.query(
    q.Get(q.Ref(q.Collection(`${mealType}`), id))
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ meal: data }),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };
};
