import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL)
     .then(() => console.log('Connected to MongoDB Atlas...'))
     .catch(err =>console.error('Could not connect to MongoDB...'))