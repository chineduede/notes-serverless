import { calculateCost } from '@notes/core/cost';
import handler from '@notes/core/handler';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { Config } from 'sst/node/config';
import Stripe from 'stripe';

export const main = handler(async (event: APIGatewayProxyEvent) => {
  console.log('Received event: ', event);
  const { storage, source } = JSON.parse(event.body || '{}');
  const amount = calculateCost(storage);
  const description = 'Scratch charge';

  const stripe = new Stripe(Config.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: 'usd',
  });

  return JSON.stringify({ status: true });
});