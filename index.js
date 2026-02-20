const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000;

//middleware//
app.use(cors());
app.use(express.json());

//pass:ofRP9VUq6EAavSj7
//user:alamzahangir218_db_user

const uri = "mongodb+srv://alamzahangir218_db_user:ofRP9VUq6EAavSj7@cluster0.pcdtzjd.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(){
try{

  await client.connect();

  const database = client.db('usersdb');
  const usersCollection = database.collection('users')

  app.post('/users', async(req, res) => {
  // const user = req.body;  
  // console.log(user);
  const newUser = req.body;
  const result = await usersCollection.insertOne(newUser);
  res.send(result);
  })

  await client.db('admin').command({ping: 1})
   console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
finally{
}
}
run().catch(console.dir)


app.get('/', (req, res) =>{
    res.send('Simple Crud Server rinning')
});

app.listen(port, ()=>{
    console.log(`Simple Crud server running on,${port}`)
})
