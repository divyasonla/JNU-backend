import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Admin from './models/Admin.js';
import Program from './models/Program.js';
import News from './models/News.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Admin.deleteMany();
    await Program.deleteMany();
    await News.deleteMany();

    const createdAdmin = await Admin.create({
      email: 'admin@jnu.edu',
      password: 'password123',
    });

    console.log('Admin user seeded:', createdAdmin.email);

    await Program.insertMany([
      {
        name: 'B.Tech in Computer Science',
        type: 'UG',
        department: 'School of Engineering',
        duration: '4 Years',
        eligibility: '10+2 with Physics and Mathematics',
        fees: '₹ 1,50,000 / Year',
        description: 'A comprehensive program covering algorithms, software engineering, and AI.',
      },
      {
        name: 'Master of Business Administration (MBA)',
        type: 'PG',
        department: 'School of Management',
        duration: '2 Years',
        eligibility: 'Bachelor Degree with 50%',
        fees: '₹ 2,00,000 / Year',
        description: 'Prepare for leadership roles in business and management.',
      }
    ]);

    await News.insertMany([
      {
        title: 'Admissions Open 2024-25',
        shortDescription: 'Apply now for UG and PG programs.',
        content: 'We are thrilled to announce that admissions for the academic year 2024-25 are now open for all undergraduate and postgraduate programs. Apply before the deadline.',
        category: 'Admissions'
      },
      {
        title: 'Convocation Ceremony 2024',
        shortDescription: '15th Annual Convocation.',
        content: 'The 15th Annual Convocation of the University will be held next month. All graduating students must register.',
        category: 'Events'
      }
    ]);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Admin.deleteMany();
    await Program.deleteMany();
    await News.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
