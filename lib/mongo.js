const { MongoClient, ObjectId } = require("mongodb");
// const debug = require("debug")("app:mongo");
const { config } = require("../config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_HOST = config.dbHost;
const DB_PORT = config.dbPort;
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true`; // prettier-ignore

class MongoLib {
  constructor() {
    console.log("MONGO_URI: " + MONGO_URI)
    this.client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });
    this.dbName = DB_NAME;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect(error => {
        if (error) {
          reject(error);
        }
        console.log("Connected succesfully to mongo");
        resolve(this.client.db(`${DB_NAME}`));
      });
    });
  }

  async getAll(collection, query) {
    const db = await this.connect();
    return await db.collection(collection).find(query).toArray();
  }

  async get(collection, id) {
    const db = await this.connect();
    return await db.collection(collection).findOne({ _id: ObjectId(id) });
  }

  async create(collection, data) {
    const db = await this.connect();
    const result = await db.collection(collection).insertOne(data);
    return result.insertedId;
  }

  async createAll(collection, data) {
    const db = await this.connect();
    const result = await db.collection(collection).insertMany(data);
    return result.insertedIds;
  }

  async update(collection, id, data) {
    const db = await this.connect();
    const result = await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    return result.upsertedId || id;
  }

  async delete(collection, id) {
    const db = await this.connect();
    await db.collection(collection).deleteOne({ _id: ObjectId(id) });
    return id;
  }
}

module.exports = MongoLib;
