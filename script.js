import express from "express";
import mongoose from "mongoose";
import bodyParser from'body-parser';
import {MongoClient,ServerApiVersion, ObjectId} from "mongodb";

const app = express();
const PORT = process.env.PORT || 3000;




app.use(bodyParser.json());

const uri = "mongodb+srv://shahenshamohammedam:shahensha12@cluster0.d2uk6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);





///get all data
app.get('/get-data', async (req, res) => {
  try {
    console.log('helloo')
    // Connect to MongoDB
    await client.connect();

    // Access the database and collection
    const database = client.db("subscribers"); // Replace with your database name
    const collection = database.collection("peoples"); // Replace with your collection name

    // Fetch all documents from the collection
    const data = await collection.find({}).toArray();

    // Send the data as a response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "An error occurred while fetching data." });
  } finally {
    // Close the connection
    await client.close();
  }
});

//get data by id
app.get('/get-data/:id', async (req, res) => {
  try {
    console.log('helloo')
    // Connect to MongoDB
    await client.connect();

    // Access the database and collection
    const database = client.db("subscribers"); // Replace with your database name
    const collection = database.collection("peoples"); // Replace with your collection name

    // Fetch all documents from the collection
    // const data = await collection.find({}).toArray();


     // Fetch the document based on the id parameter
     const id = req.params.id;
     const query = { _id: new ObjectId(id) }; 
     
     // Assuming the id is stored as ObjectId in MongoDB

     const options =  { projection: {_id:0 , name 
      :1
     }}
     const data = await collection.findOne(query, options);
    //  const data = await collection.findOne(query);

     if (data) {
      // Send the data as a response
      res.status(200).json(data);
    } else {
      // If no document is found, send a 404 response
      res.status(404).json({ message: "Document not found." });
    }
    // Send the data as a response
    // res.status(200).json(req.params.id);


   
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "An error occurred while fetching data." });
  } finally {
    // Close the connection
    await client.close();
  }
});



///create data
app.post('/add-data', async (req, res) => {
  try {

console.log(`${req} ${res.data}`)

    await client.connect();
    const database = client.db("subscribers");
    const collection = database.collection("peoples");

    const data = req.body;
    const result = await collection.insertOne(data);

    res.status(201).json({ message: "Data inserted successfully!", insertedId: result.insertedId });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "An error occurred while inserting data." });
  } finally {
    await client.close();
  }
});




///delete data
app.delete('/delete-data/:id', async (req, res) => {
  try {
    console.log('Deleting document with id:', req.params.id);
    
    // Connect to MongoDB
    await client.connect();

    // Access the database and collection
    const database = client.db("subscribers"); // Replace with your database name
    const collection = database.collection("peoples"); // Replace with your collection name

    // Convert the id parameter to ObjectId
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }; // Use ObjectId to convert the string id to MongoDB ObjectId

    // Delete the document
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 1) {
      // If the document was deleted successfully
      res.status(200).json({ message: "Document deleted successfully." });
    } else {
      // If no document was found to delete
      res.status(404).json({ message: "Document not found." });
    }
   
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "An error occurred while deleting data." });
  } finally {
    // Close the connection
    await client.close();
  }
});

///Update data
app.patch('/patch-data/:id', async (req, res) => {
  try {
    console.log('Patching document with id:', req.params.id);
    
    // Connect to MongoDB
    await client.connect();

    // Access the database and collection
    const database = client.db("subscribers"); // Replace with your database name
    const collection = database.collection("peoples"); // Replace with your collection name

    // Convert the id parameter to ObjectId
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }; // Use ObjectId to convert the string id to MongoDB ObjectId

    // Extract the fields to update from the request body
    const updateFields = req.body;

    // Construct the update operation
    const updateOperation = { $set: updateFields };

    // Update the document
    const result = await collection.updateOne(query, updateOperation);

    if (result.matchedCount === 1) {
      // If the document was found and updated
      res.status(200).json({ message: "Document updated successfully." });
    } else {
      // If no document was found to update
      res.status(404).json({ message: "Document not found." });
    }
   
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "An error occurred while updating data." });
  } finally {
    // Close the connection
    await client.close();
  }
});


// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Sample data (simulating a database)
// let users = [
//     { id: 1, name: "Alice" },
//     { id: 2, name: "Bob" },
//     { id: 3, name: "Raj" },

// ];


// app.get("/users", (req, res) => {
   
//     res.json(users); // Send users array as JSON
// });

// // POST - Add a new user
// app.post("/users", (req, res) => {
//     const newUser = req.body;
//     newUser.id = users.length + 1;
//     users.push(newUser);
//     res.status(201).json(newUser);
// });
// // PUT - Update an existing user
// app.put("/users/:id", (req, res) => {
//     const userId = parseInt(req.params.id);
//     const updatedData = req.body;

//     let user = users.find(u => u.id === userId);
//     if (!user) {
//         return res.status(404).json({ message: "User not found" });
//     }

//     user.name = updatedData.name;
//     res.json(user);
// });

// // DELETE - Remove a user
// app.delete("/users/:id", (req, res) => {
//     const userId = parseInt(req.params.id);
//     users = users.filter(user => user.id !== userId); 
//     res.json({ message: "User deleted successfully" });
// });
