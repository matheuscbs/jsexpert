import MongoDB from "mongodb";

export default class MongoDBStrategy {
  #instance;
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.db = this.connectionString.replace(/^.*\//, "");
    this.collection = "warriors";
  }

  async connect() {
    const client = new MongoDB.MongoClient(this.connectionString, {});
    await client.connect();
    const db = client.db(this.dbName).collection(this.collection);
    this.#instance = db;
  }

  async create(item) {
    return this.#instance.insertOne(item);
  }

  async read(query) {
    return this.#instance.find(query).toArray();
  }
}
