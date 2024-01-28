import { DeleteCommandInput } from '@aws-sdk/lib-dynamodb';
import dynamodb from '@notes/core/dynamodb';
import handler from '@notes/core/handler';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { Table } from 'sst/node/table';

export const main = handler(async (event: APIGatewayProxyEvent) => {
  const params: DeleteCommandInput = {
    TableName: Table.Notes.tableName,
    Key: {
      userId: '123',
      noteId: event.pathParameters?.id,
    },
  };

  await dynamodb.delete(params);
  return JSON.stringify({ status: true });
});
