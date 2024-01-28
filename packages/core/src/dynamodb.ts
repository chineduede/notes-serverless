import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DeleteCommandInput,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

export default {
  get: async (params: GetCommandInput) => await dynamodb.send(new GetCommand(params)),
  put: async (params: PutCommandInput) => await dynamodb.send(new PutCommand(params)),
  query: async (params: QueryCommandInput) => await dynamodb.send(new QueryCommand(params)),
  update: async (params: UpdateCommandInput) => await dynamodb.send(new UpdateCommand(params)),
  delete: async (params: DeleteCommandInput) => await dynamodb.send(new DeleteCommand(params)),
};
