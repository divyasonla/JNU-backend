import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import programRoutes from './routes/programRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import recruiterRoutes from './routes/recruiterRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import leadRoutes from './routes/leadRoutes.js';

import { errorHandler, notFound } from './middleware/errorHandler.js';
import Result from './models/Result.js';
import Admin from './models/Admin.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
const allowedOrigin = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : 'http://localhost:5173';

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin matches allowed origin, localhost, or any Vercel preview URL
    if (
      origin === allowedOrigin || 
      origin === allowedOrigin + '/' || 
      origin.startsWith('http://localhost:') || 
      origin.endsWith('.vercel.app')
    ) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/recruiters', recruiterRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/leads', leadRoutes);

app.get('/api', (req, res) => {
  res.send('JNU College API is running...');
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Seed Sample Result logic
const seedSampleResult = async () => {
  try {
    const existing = await Result.findOne({ rollNumber: 'JNU2026001234' });
    if (!existing) {
      await Result.create({
        rollNumber: 'JNU2026001234',
        studentName: 'John Doe',
        program: 'B.Tech Computer Science',
        semester: 'Semester 4',
        session: 'May-June 2026',
        sgpa: 8.9,
        cgpa: 8.75,
        resultStatus: 'PASS',
        subjects: [
          { subjectCode: 'CS401', subjectName: 'Database Management Systems', credits: 4, grade: 'A+', status: 'Pass' },
          { subjectCode: 'CS402', subjectName: 'Operating Systems', credits: 4, grade: 'A', status: 'Pass' },
          { subjectCode: 'CS403', subjectName: 'Computer Networks', credits: 4, grade: 'B+', status: 'Pass' },
          { subjectCode: 'CS404', subjectName: 'Software Engineering', credits: 3, grade: 'A', status: 'Pass' },
          { subjectCode: 'CS405', subjectName: 'Web Technologies', credits: 3, grade: 'A+', status: 'Pass' }
        ]
      });
      console.log('Sample result seeded: JNU2026001234');
    }
  } catch (error) {
    console.error('Error seeding sample result:', error);
  }
};

// Seed Admin logic
const seedAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      await Admin.create({
        email: 'admin@example.com',
        password: 'admin123'
      });
      console.log('Admin account seeded: admin@example.com / admin123');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, async () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    await seedSampleResult();
    await seedAdmin();
  });
}

export default app;
