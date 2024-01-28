import { ReturnValue } from '@aws-sdk/client-dynamodb';
import { UpdateCommandInput } from '@aws-sdk/lib-dynamodb';
import dynamodb from '@notes/core/dynamodb';
import handler from '@notes/core/handler';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { Table } from 'sst/node/table';

export const main = handler(async (event: APIGatewayProxyEvent) => {
  const data = JSON.parse(event.body || '{}');
  const params: UpdateCommandInput = {
    TableName: Table.Notes.tableName,
    Key: {
      userId: '123',
      noteId: event.pathParameters?.id,
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null,
    },
    ReturnValues: ReturnValue.ALL_NEW,
  };

  await dynamodb.update(params);
  return JSON.stringify({ status: true });
}
);