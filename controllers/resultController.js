import Result from '../models/Result.js';
import Lead from '../models/Lead.js';

// @desc    Check if roll number exists
// @route   POST /api/results/check-roll
// @access  Public
export const checkRollNumber = async (req, res, next) => {
  try {
    const { rollNumber } = req.body;
    if (!rollNumber) {
      res.status(400);
      throw new Error('Roll Number is required');
    }

    const resultExists = await Result.exists({
      $or: [
        { rollNo: rollNumber.toUpperCase() },
        { enrollNo: rollNumber.toUpperCase() }
      ]
    });

    if (resultExists) {
      res.status(200).json({ exists: true });
    } else {
      res.status(404).json({ exists: false, message: "Roll / Enrollment Number not found" });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch result and save lead
// @route   POST /api/results/fetch-result
// @access  Public
export const fetchResult = async (req, res, next) => {
  try {
    const { rollNumber, username, email, phone } = req.body;

    if (!rollNumber) {
      res.status(400);
      throw new Error('Roll Number is required');
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400);
      throw new Error('Invalid email format');
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      res.status(400);
      throw new Error('Phone number must be exactly 10 digits');
    }

    // Save lead only if fields are provided
    if (username || email || phone) {
      await Lead.create({
        leadType: 'RESULT_VIEW',
        rollNumber: rollNumber.toUpperCase(),
        fullName: username,
        email,
        phone
      });
    }

    const studentResult = await Result.findOne({
      $or: [
        { rollNo: rollNumber.toUpperCase() },
        { enrollNo: rollNumber.toUpperCase() }
      ]
    });

    if (!studentResult) {
      res.status(404);
      throw new Error('Result not found');
    }

    res.status(200).json({ success: true, data: studentResult });

  } catch (error) {
    next(error);
  }
};
