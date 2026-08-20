import Lead from '../models/Lead.js';

// @desc    Submit a new admission application lead
// @route   POST /api/leads/apply
// @access  Public
export const applyOnline = async (req, res, next) => {
  try {
    const { fullName, email, phone, programInterested } = req.body;

    if (!fullName || !email || !phone || !programInterested) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400);
      throw new Error('Invalid email format');
    }

    const lead = await Lead.create({
      leadType: 'ADMISSION_APPLY',
      fullName,
      email,
      phone,
      programInterested
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};
