import { Cognito, StackContext, use } from 'sst/constructs';
import { ApiStack } from './ApiStack';
import { StorageStack } from './StorageStack';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { namingStrategy } from './Naming';

export function AuthStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);
  const { bucket } = use(StorageStack);

  const auth = new Cognito(stack, namingStrategy.name('auth'), {
    login: ['email'],
  });

  auth.attachPermissionsForAuthUsers(stack, [
    api,
    new PolicyStatement({
      actions: ['s3:*'],
      effect: Effect.ALLOW,
      resources: [bucket.bucketArn + '/private/${cognito-identity.amazonaws.com:sub}/*'],
    }),
  ]);

  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
  });

  return { auth };
}
