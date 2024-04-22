const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const poemRoutes = require('./routes/poemRoutes');
const cors = require('cors'); 
const userActionsRoutes = require("./routes/userActionsRoutes");
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crudapi';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1);
});

app.use(express.json());
app.use(cors());
app.use(cookieParser()); // Place cookieParser middleware here

app.use('/auth', authRoutes);
app.use('/api', poemRoutes);
app.use('/api', userActionsRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
