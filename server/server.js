const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

const conStr = "mongodb+srv://admin:F1ttaB5OLMQDUkVn@emi-coin.vdukp5a.mongodb.net/?retryWrites=true&w=majority";
const database = "shoppinglist";
const collection = "items";
const client = new MongoClient(conStr);

app.get("/api/getItems", async (req, res) => {
    try {
        await client.connect();

        const db = client.db(database);
        const col = db.collection(collection);

        let data = await col.find({}).toArray();

        for (let i = 0; i < data.length; i++) {
            data[i].name = decodeString(data[i].name);
        }

        res.json(data);
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
});

app.get("/api/deleteItem", async (req, res) => {
    let name = req.headers["name"];

    try {
        await client.connect();

        const db = client.db(database);
        const col = db.collection(collection);

        name = decodeString(name);

        await col.deleteOne({"name": name});

        res.json("Successfully delete Item");
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
});

app.get("/api/addItem", async (req, res) => {
    let name = req.headers["name"];

    try {
        await client.connect();

        const db = client.db(database);
        const col = db.collection(collection);

        name = encodeString(name)

        await col.insertOne({"name": name});

        res.json("Successfully inserted Item");
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

function encodeString(string) {
    string.replace("ä", "_ae_");
    string.replace("ö", "_oe_");
    string.replace("ü", "_ue_");
    return string;
}

function decodeString(string) {
    string.replace("_ae_", "ä");
    string.replace("_oe_", "ö");
    string.replace("_ue_", "ü");
    return string;
}
