export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Handle mongoose bad object ID or validation error
  let message = err.message;
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource not found';
    res.status(404);
  } else if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(val => val.message).join(', ');
    res.status(400);
  } else if (err.code === 11000) {
    message = 'Duplicate field value entered';
    res.status(400);
  }

  res.status(res.statusCode || statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
