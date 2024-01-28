import { RemovalPolicy } from 'aws-cdk-lib/core';
import { Bucket, StackContext, Table } from 'sst/constructs';
import { namingStrategy } from './Naming';

export function StorageStack(scope: StackContext) {
  const table = new Table(scope.stack, 'Notes', {
    fields: {
      userId: 'string',
      noteId: 'string',
    },
    primaryIndex: { partitionKey: 'userId', sortKey: 'noteId' },
    cdk: {
      table: {
        tableName: namingStrategy.name('notes'),
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
  });

  const bucket = new Bucket(scope.stack, namingStrategy.name('uploads'), {
    name: namingStrategy.name('uploads'),
    cdk: {
      bucket: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
  });

  return { table, bucket };
}
