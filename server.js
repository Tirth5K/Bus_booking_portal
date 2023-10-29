// server.js
/*const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Define a route for handling login requests
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Here, you can implement your login logic, check credentials, etc.
  // For simplicity, we'll just check for a predefined username and password.

  if (username === 'user' && password === 'password') {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Login failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Retrieve the stored data from sessionStorage
var storedBookingDetails = sessionStorage.getItem("bookingDetails");

// Check if data exists
if (storedBookingDetails) {
// Parse the JSON data
var bookingDetails = JSON.parse(storedBookingDetails);

// Display the data in the appropriate sections
document.querySelector(".confirmation li:nth-child(1)").textContent = "Departure City: " + bookingDetails.departureCity;
document.querySelector(".confirmation li:nth-child(2)").textContent = "Arrival City: " + bookingDetails.arrivalCity;
document.querySelector(".confirmation li:nth-child(3)").textContent = "Date of Travel: " + bookingDetails.dateOfTravel;
document.querySelector(".confirmation li:nth-child(4)").textContent = "Passenger Name: " + bookingDetails.passengerName;
document.querySelector(".confirmation li:nth-child(5)").textContent = "Seat Number: " + bookingDetails.seatNumber;
}
*/
// app.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Set your desired port

// Add your routes and MongoDB connection logic here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const { MongoClient } = require('mongodb');
const uri = '<connection_string>';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDatabase();

app.use(express.json());

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password (you'll need to import the bcrypt library)
  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    name,
    email,
    password: hashedPassword,
  };

  // Insert the user data into the MongoDB database
  const result = await client.db('your_database_name').collection('your_collection_name').insertOne(userData);

  res.status(201).json({ message: 'Registration successful' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check the credentials against the MongoDB database
  const user = await client.db('your_database_name').collection('your_collection_name').findOne({ email });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Incorrect email or password' });
    }
  } else {
    res.status(401).json({ message: 'User not found' });
  }
});
