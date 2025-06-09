import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './db.js';
import dishRoutes from './routes/dishRoutes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.static('public'));
app.use('/', dishRoutes);

const PORT = process.env.PORT;

dbConnect();

app.listen(PORT, () => {     
    console.log(`Server running on the port ${PORT}...`);
 });