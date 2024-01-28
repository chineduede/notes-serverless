import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

export default function handler(lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<string>) {
  return async function (event: APIGatewayProxyEvent, context: Context) {
    let body: string;
    let statusCode: StatusCodes;
    try {
      body = await lambda(event, context);
      statusCode = StatusCodes.OK;
    } catch (error) {
      console.error(error);
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      body = JSON.stringify({ error: error instanceof Error ? error.message : String(error) });
    }

    return {
      body,
      statusCode,
    };
  };
}
