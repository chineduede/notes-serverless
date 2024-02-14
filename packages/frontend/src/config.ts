export default {
  MAX_ATTACHMENT_SIZE: 5_000_000,
  STRIPE_KEY: 'pk_test_51OdpJBLwhjDbxicHgX86blqR2enQe6ZnxoxRer5yN4jT1R8rR0Q48AnBRvbI4YqNPi7RK0gPfuTi6JK1cmbDaJN200VMgwkBSv',
  s3: {
    REGION: import.meta.env.VITE_REGION,
    BUCKET: import.meta.env.VITE_BUCKET,
  },
  apiGateway: {
    REGION: import.meta.env.VITE_REGION,
    URL: import.meta.env.VITE_API_URL,
  },
  cognito: {
    REGION: import.meta.env.VITE_REGION,
    USER_POOL_ID: import.meta.env.VITE_USER_POOL_ID,
    APP_CLIENT_ID: import.meta.env.VITE_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: import.meta.env.VITE_IDENTITY_POOL_ID,
  },
};
