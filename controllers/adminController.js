import Result from '../models/Result.js';
import Lead from '../models/Lead.js';

// @desc    Add a single student result
// @route   POST /api/admin/results
// @access  Private/Admin
export const addResult = async (req, res, next) => {
  try {
    const { rollNumber } = req.body;
    


    const result = await Result.create(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload a student result matching the new schema
// @route   POST /api/admin/upload-result
// @access  Private/Admin
export const uploadResult = async (req, res, next) => {
  try {
    const { rollNo, enrollNo } = req.body;



    const result = await Result.create(req.body);
    res.status(201).json({ 
      success: true, 
      message: "Result saved successfully in DataBase!",
      data: result 
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk insert results
// @route   POST /api/admin/results/bulk
// @access  Private/Admin
export const addBulkResults = async (req, res, next) => {
  try {
    const results = req.body;
    if (!Array.isArray(results) || results.length === 0) {
      res.status(400);
      throw new Error('Please provide an array of results');
    }

    const insertedResults = await Result.insertMany(results, { ordered: false });
    res.status(201).json({ success: true, count: insertedResults.length, data: insertedResults });
  } catch (error) {
    // Handle duplicate key errors from insertMany gracefully
    if (error.code === 11000) {
      res.status(400);
      error.message = 'Some records contain duplicate roll numbers';
    }
    next(error);
  }
};

// @desc    Get all results
// @route   GET /api/admin/results
// @access  Private/Admin
export const getAllResults = async (req, res, next) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a single result
// @route   PUT /api/admin/results/:id
// @access  Private/Admin
export const updateResult = async (req, res, next) => {
  try {
    const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!result) {
      res.status(404);
      throw new Error('Result not found');
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a result
// @route   DELETE /api/admin/results/:id
// @access  Private/Admin
export const deleteResult = async (req, res, next) => {
  try {
    const id = req.params.id;
    // Check if id is valid ObjectId, otherwise treat it as rollNo
    let result;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      result = await Result.findById(id);
    } else {
      result = await Result.findOne({ rollNo: id.toUpperCase() });
    }

    if (!result) {
      res.status(404);
      throw new Error('Result not found');
    }

    await result.deleteOne();
    res.status(200).json({ success: true, message: 'Result removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard-stats
// @access  Private/Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const admissionLeads = await Lead.countDocuments({ leadType: 'ADMISSION_APPLY' });
    const resultLeads = await Lead.countDocuments({ leadType: 'RESULT_VIEW' });
    const totalResults = await Result.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        admissionLeads,
        resultLeads,
        totalResults
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all leads with filtering and pagination
// @route   GET /api/admin/leads
// @access  Private/Admin
export const getAllLeads = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const query = {};
    if (req.query.type) {
      query.leadType = req.query.type;
    }
    
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { fullName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { rollNumber: searchRegex }
      ];
    }

    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query).skip(startIndex).limit(limit).sort({ createdAt: -1 });

    res.status(200).json({ 
      success: true, 
      count: leads.length, 
      pagination: {
        page,
        limit,
        total
      },
      data: leads 
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update lead status
// @route   PATCH /api/admin/leads/:id/status
// @access  Private/Admin
export const updateLeadStatus = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404);
      throw new Error('Lead not found');
    }
    
    lead.status = req.body.status || lead.status;
    await lead.save();
    
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a lead
// @route   DELETE /api/admin/leads/:id
// @access  Private/Admin
export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404);
      throw new Error('Lead not found');
    }
    
    await lead.deleteOne();
    res.status(200).json({ success: true, message: 'Lead removed' });
  } catch (error) {
    next(error);
  }
};
