# Dieter - Backend
Backend for Dieter - System for managing food recipes and shopping lists

# Overview
This repository contains a "backend" code and infrastructure that is used in Dieter project. It holds all the Lambda functions code as well as infrastructure resources. AWS CDK is used as a Infrastructure-as-a-Code. It creates a set of AWS Lambda functions, API Gateway and Cognito User Pool.

## Folders

* `lib` has the CDK code that represents how infrastructure should look like
* `resources` contains source code for Lambda functions
* `static` holds JSON files with meals recipes

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
