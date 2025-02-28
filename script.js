import express from "express";


// import path from "path"
// import { fileURLToPath } from "url";


// // Define __dirname manually
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// app.get("/", (req, res)=> {

//     res.sendFile(path.join(__dirname, "views", "index.html"));

// })

// console.log(`heloooo${path.join(__dirname, "views", "index.html")}`);

// app.get("/Contact", (req, res)=>{
//     res.sendFile(path.join(__dirname, "views", "contact.html"));
// })
// app.get("*", (req, res)=>{
//     res.status(404)
//     res.send("<h1>404</h1>")
// })

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, ()=> console.log(`Server running on ${PORT}`))

//  createServer((req, res)=>{
// res.write("This is Node js")
// res.end();


//  }).listen(3001,()=> console.log('Server is running'))

//  console.log("done");



const app = express();
const PORT = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample data (simulating a database)
let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Raj" },

];

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app.get("/users", (req, res) => {
   
    res.json(users); // Send users array as JSON
});

// POST - Add a new user
app.post("/users", (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.status(201).json(newUser);
});
