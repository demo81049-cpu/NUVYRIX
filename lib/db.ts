import {
  Db,
  MongoClient,
  MongoParseError,
  MongoServerError,
  MongoServerSelectionError,
} from "mongodb";

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

export function getDatabaseErrorMessage(error: unknown) {
  if (error instanceof Error && error.message === "MONGODB_URI is not configured") {
    return "MongoDB is not configured on this server. Set MONGODB_URI and restart or redeploy.";
  }

  if (error instanceof MongoParseError) {
    return "The MongoDB URI is invalid. Check its format and URL-encode special characters in the password.";
  }

  if (error instanceof MongoServerError && error.code === 18) {
    return "MongoDB authentication failed. Check the Atlas database username and rotated password.";
  }

  if (error instanceof MongoServerSelectionError) {
    return "This server cannot reach MongoDB Atlas. Check the cluster status and Atlas Network Access rules.";
  }

  return "MongoDB could not save the message. Check the Atlas database user permissions and server logs.";
}
