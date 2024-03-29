import AWS from "aws-sdk";
import { arch } from "os";

export async function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}