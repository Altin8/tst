const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const conversationRouter = require('./routes/conversation');
const messageRouter = require('./routes/messages');
const emailRouter = require('./routes/email');

// Connecting to MongoDB
mongoose.connect('mongodb+srv://cluster0.ci080qs.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully!');
});

// Setting up server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// User routes
app.use('/users', userRoutes);
app.use('/conversations', conversationRouter);
app.use('/messages', messageRouter); 
app.use('/email', emailRouter); 

// Start server
const port = 3000; // change to your desired port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
