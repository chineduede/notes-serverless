import { Bucket, StackContext, Table } from 'sst/constructs';

export function StorageStack(scope: StackContext) {
  const table = new Table(scope.stack, 'Notes', {
    fields: {
      userId: 'string',
      noteId: 'string',
    },
    primaryIndex: { partitionKey: 'userId', sortKey: 'noteId' },
  });

  const bucket = new Bucket(scope.stack, 'Uploads');

  return { table, bucket };
}
