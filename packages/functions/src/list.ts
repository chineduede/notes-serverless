import { QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import dynamodb from '@notes/core/dynamodb';
import handler from '@notes/core/handler';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { Table } from 'sst/node/table';

export const main = handler(async (event: APIGatewayProxyEvent) => {
  console.log('Received event: ', event);
  const params: QueryCommandInput = {
    TableName: Table.Notes.tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
    },
  };

  const result = await dynamodb.query(params);
  return JSON.stringify(result.Items);
});
