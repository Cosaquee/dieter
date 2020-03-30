const AWS = require("aws-sdk");
const faunadb = require("faunadb"),
  q = faunadb.query;

const API_KEY = process.env.API_KEY;

export const handler = async (event: any = {}): Promise<any> => {
  const prefix = event.pathParameters.mealType;

  if (!prefix) {
    return {
      statusCode: 404,
      body: `Error: You are missing the mealType parameter`
    };
  }

  let client = new faunadb.Client({ secret: API_KEY, keepAlive: false });

  let { data } = await client.query(
    q.Paginate(q.Match(q.Ref(`indexes/all_${prefix}s`)))
  );

  const getAll = data.map((ref: any) => {
    return q.Get(ref);
  });

  const meals = await client.query(getAll);

  return {
    statusCode: 200,
    body: JSON.stringify({ meals: meals }),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };
};
