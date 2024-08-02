const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require("dotenv").config()


const connectionURL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@sttonn-cluster0.ebbfsbd.mongodb.net/`
const databaseName = "astro-task-manager"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(connectionURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = client.db(databaseName)
    const taskCollection = db.collection("users")
    const result = await taskCollection.deleteMany({
      age: 25
    })
    console.log(await (await taskCollection.find()).toArray())
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
