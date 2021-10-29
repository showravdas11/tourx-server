const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eeauc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();

        const database = client.db("tourx");
        const serviceCollection = database.collection("services");

        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({})
            const services = await cursor.toArray();
            res.send(services)
        })
    }

    finally {
        // await client.close();
    }
}

run().catch(console.dir);


// tourx
// Lz3LItjyBgk8JWX1

app.get('/', (req, res) => {
    res.send('tourx')
})

app.listen(port, () => {
    console.log('tourx running', port);
})