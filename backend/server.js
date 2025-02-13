import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import authRoutes from './routes/authenticate.js';
import timeCapsuleRoutes from './routes/timecapsules.js';
import personalityRoutes from './routes/personality.js';
import therapyRoutes from './routes/therapy.js';
import therapistsRoutes from './routes/therapists.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/timecapsules', timeCapsuleRoutes);
app.use('/api/personality', personalityRoutes);
app.use('/api/therapy', therapyRoutes);
app.use('/api/therapists', therapistsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
