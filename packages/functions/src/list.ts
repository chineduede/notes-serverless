import { QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import dynamodb from '@notes/core/dynamodb';
import handler from '@notes/core/handler';
import { Table } from 'sst/node/table';

export const main = handler(async (event: APIGatewayProxyEvent) => {
  const params: QueryCommandInput = {
    TableName: Table.Notes.tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': '123',
    },
  };

  const result = await dynamodb.query(params);
  return JSON.stringify(result.Items);
});
