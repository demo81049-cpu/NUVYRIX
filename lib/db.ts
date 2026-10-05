import { Db, MongoClient } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
  mongoDbPromise?: Promise<Db>;
};

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (!globalForMongo.mongoDbPromise) {
    const client = new MongoClient(uri);
    globalForMongo.mongoClientPromise = client.connect();
    globalForMongo.mongoDbPromise = globalForMongo.mongoClientPromise
      .then(async (connectedClient) => {
        const db = connectedClient.db(process.env.MONGODB_DB_NAME || "nuvyrix");
        await Promise.all([
          db.collection("contact_inquiries").createIndex({ createdAt: -1 }),
          db.collection("payment_records").createIndex(
            { orderId: 1 },
            { unique: true },
          ),
          db.collection("payment_records").createIndex(
            { paymentId: 1 },
            { unique: true, sparse: true },
          ),
        ]);
        return db;
      })
      .catch((error: unknown) => {
        globalForMongo.mongoClientPromise = undefined;
        globalForMongo.mongoDbPromise = undefined;
        throw error;
      });
  }

  return globalForMongo.mongoDbPromise;
}
