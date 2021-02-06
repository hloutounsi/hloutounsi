import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/hloutounsi',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || 'google api key',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
  EMAIL: process.env.EMAIL || 'hloutounsi2@gmail.com',
  PASSWORD_EMAIL: process.env.PASSWORD_EMAIL || 'email password',
  PRODUTION: process.env.PRODUTION || false
};