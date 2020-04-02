import core = require("@aws-cdk/core");
import apigateway = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");
import s3 = require("@aws-cdk/aws-s3");

const FAUNA_API_KEY = process.env.FAUNA_API_KEY as string;

export class DieterStack extends core.Stack {
  constructor(scope: core.App, id: string, props?: core.StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, "dieter-meals", {
      restApiName: "Dieter Meals",
      description: "This service manages Dieter resources"
    });

    const meals = api.root.addResource("meals");

    const fetchMeals = new lambda.Function(this, "fetch-meals", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.asset("resources/fetch-meals"),
      handler: "fetch-meals.handler",
      environment: {
        API_KEY: FAUNA_API_KEY
      }
    });

    const mealsByType = meals.addResource("{mealType}");

    const fetchMealsIntegration = new apigateway.LambdaIntegration(fetchMeals, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    mealsByType.addMethod("GET", fetchMealsIntegration);
    addCorsOptions(mealsByType);

    const fetchMeal = new lambda.Function(this, "fetch-meal", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.asset("resources/fetch-meal"),
      handler: "fetch-meal.handler",
      environment: {
        API_KEY: FAUNA_API_KEY
      }
    });

    const mealID = mealsByType.addResource("{mealID}");
    const fetchMealIntegration = new apigateway.LambdaIntegration(fetchMeal, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    mealID.addMethod("GET", fetchMealIntegration);
    addCorsOptions(mealID);
  }
}

export function addCorsOptions(apiResource: apigateway.IResource) {
  apiResource.addMethod(
    "OPTIONS",
    new apigateway.MockIntegration({
      integrationResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Access-Control-Allow-Headers":
              "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
            "method.response.header.Access-Control-Allow-Origin": "'*'",
            "method.response.header.Access-Control-Allow-Credentials":
              "'false'",
            "method.response.header.Access-Control-Allow-Methods":
              "'OPTIONS,GET,PUT,POST,DELETE'"
          }
        }
      ],
      passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
      requestTemplates: {
        "application/json": '{"statusCode": 200}'
      }
    }),
    {
      methodResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Access-Control-Allow-Headers": true,
            "method.response.header.Access-Control-Allow-Methods": true,
            "method.response.header.Access-Control-Allow-Credentials": true,
            "method.response.header.Access-Control-Allow-Origin": true
          }
        }
      ]
    }
  );
}
