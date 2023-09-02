const { MongoClient } = require('mongodb');
const config = require('../config');
const db_url = config.databaseUrl;

let client = null; 

// Function to connect or reuse the existing connection
async function connectToDatabase(forceNew = false) {
    if (forceNew || !client || !client.isConnected()) {
        client = new MongoClient(db_url, { useUnifiedTopology: true });
        await client.connect();
    }
    return client;
}

async function createDocument(databaseName, collectionName, document) {
    try {
        const connectedClient = await connectToDatabase(forceNew = true);
        const db = connectedClient.db(databaseName);
        const collection = db.collection(collectionName);
        
        await collection.insertOne(document);
        return { status: 'Data submitted successfully!!' };        
    } catch (error) {
        console.error(error);
        return { status: 'Data submission error!!' };
    }
}

async function readDocument(databaseName, collectionName) {
    try {
        const connectedClient = await connectToDatabase(forceNew = true);
        const db = connectedClient.db(databaseName);
        const collection = db.collection(collectionName);
        
        var dataArray = await collection.find({}).toArray();
        return dataArray;
    } catch (error) {
        console.error(error);
        return { status: 'Data reading error!!' };
    }
}

async function deleteDocument(databaseName, collectionName, document) {
    try {
        const connectedClient = await connectToDatabase(forceNew = true);
        const db = connectedClient.db(databaseName);
        const collection = db.collection(collectionName);
        
        await collection.deleteOne(document);
        return { status: 'Data deleted successfully!!' };
    } catch (error) {
        console.error(error);
        return { status: 'Data deletion error!!' };
    }
}

module.exports = {
    createDocument,
    readDocument,
    deleteDocument,
  };