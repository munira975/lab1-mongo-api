import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dishRoutes from './routes/dishRoutes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use('/', dishRoutes);

const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL)
     .then(() => console.log('Connected to MongoDB Atlas...'))
     .catch(err =>console.error('Could not connect to MongoDB...'))
     
app.listen(PORT, () => {     
    console.log(`Server running on the port ${PORT}...`);
 });