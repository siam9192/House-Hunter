const express = require('express');
const cors = require('cors');
const port = 5000 || process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
require('dotenv').config()

app.get('/',(req,res)=>{
    res.send('Find Hotel server is running')
})

const dbName = process.env.DB_NAME;
const dbPass = process.env.DB_PASS;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${dbName}:${dbPass}@cluster0.katjfem.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  const database = client.db('House-hunter');
  const users = database.collection('Users');
  const properties = database.collection('Properties');
  const bookingCollection = database.collection('Booking');

  app.post('/user/login',async(req,res)=>{
    const user = req.body;
  const {email,password} = user;
  const filter = {
    email,
    password
  }
  const all = await users.find().toArray();
  
  const result = await users.findOne(filter);
  
  if(result){
    res.send({user:result})
    return;
  }
  else{
    res.send({
      status:false
    })
  }
  })
  app.post('/user/re-login',async(req,res)=>{
    const id = req.body.id;
    const filter = {
      _id: new ObjectId(id)
    }
    const findUser = await users.findOne(filter);
    if(findUser){
      res.send({user:findUser})
    }
    else{
      res.send({
        founded:false
      })
    }
  })
  app.post('/users/new/registration',async(req,res)=>{
    const user = req.body;
    const email = user.email;
    const findUser = await users.findOne({email});
    if(findUser){
      res.send({founded:true})
    }
    const result = await users.insertOne(user);
    res.send(result);
  })

  app.post('/property/post',async(req,res)=>{
    const property = req.body;
    const result = await properties.insertOne(property);
    res.send(result)

  })
  app.get('/my-properties/:email',async(req,res)=>{
    const email = req.params.email;
    const filter = {
      email
    }
    const result = await properties.find(filter).toArray();
    res.send(result)
    
  })
  app.put('/property/update',async(req,res)=>{
    const property = req.body.property;
    console.log(req.body)
    const filter = {
      _id : new ObjectId(req.body.id)
    }
    console.log(property)
    const updatedDoc = {
      $set: property
    }

  
  const result = await properties.updateOne(filter,updatedDoc);
  res.send(result)
  console.log(result)
  })
  app.delete('/property/delete',async(req,res)=>{
    const {id} = req.query;
    const filter = {
      _id: new ObjectId(id)
    }
    const result = await properties.deleteOne(filter);
    res.send(result)
  })

  app.get('/property/all',async(req,res)=>{
    const  result = await properties.find().toArray();
    res.send(result);
  })
  
  app.post('/user/booking/new',async(req,res)=>{
    const booking = req.body;
  const email = booking.email;
  const filter = {
    email: email
  }
    const find = await bookingCollection.countDocuments(filter);
    if(find > 2 ){
      res.send({status:true})
      return;
    }
    const result = await bookingCollection.insertOne(booking); 
    res.send(result);
  })
  } finally {
   
  }
}
run().catch(console.dir);



app.listen(port)