import { APIGatewayProxyEvent } from 'aws-lambda';
import { randomUUID } from 'crypto';
import handler from '@notes/core/handler';
import dynamodb from '@notes/core/dynamodb';
import { Table } from 'sst/node/table';

export const main = handler(async (event: APIGatewayProxyEvent) => {
  console.log('Received event: ', event);
  let data = {
    content: '',
    attachment: '',
  };

  if (event.body !== null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Table.Notes.tableName,
    Item: {
      userId: '123',
      noteId: randomUUID(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };

  await dynamodb.put(params);
  return JSON.stringify(params.Item);
});
