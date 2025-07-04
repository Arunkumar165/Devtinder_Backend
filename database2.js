const { MongoClient } = require('mongodb');

const url="mongodb+srv://Arun:mohan@arun.bewhyqa.mongodb.net/" ;
const client = new MongoClient(url);


const dbName = 'Hello';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('User');

  // the following code examples can be pasted here...

const countResult=await collection.countDocuments({});
//console.log(countResult,"ddddddddddddddddddd")

const filterResult =await collection.find({firstName:"Arun"}).toArray()
console.log(filterResult,"jjjjjjjjjjjj")



  const data={
    firstName:"dk",
    lastName:"kumar",
    city:"faridabad",
    phoneNumber:"8587991024"
  }

  const insertResult = await collection.insertMany([data]);
//console.log('Inserted documents =>', insertResult);

  const findResult = await collection.find({}).toArray();
//console.log('Found documents =>', findResult);

  return 'done.';
}


main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

