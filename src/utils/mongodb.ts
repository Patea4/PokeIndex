import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

// In production, it's best to not use a global variable
const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default clientPromise;
