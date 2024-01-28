import { Table } from 'sst/node/table';
import handler from '@notes/core/handler';
import dynamodb from '@notes/core/dynamodb';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const main = handler(async (event: APIGatewayProxyEvent) => {
  const params = {
    TableName: Table.Notes.tableName,
    Key: {
      userId: '123',
      noteId: event.pathParameters?.id,
    },
  };

  const result = await dynamodb.get(params);
  if (!result.Item) {
    throw new Error('Item not found.');
  }
  return JSON.stringify(result.Item);
});
