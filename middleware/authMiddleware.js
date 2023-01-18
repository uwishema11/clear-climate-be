const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { User } = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const Protected = catchAsync(async (req, res, next) => {
  // getting token and check if it's there

  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // eslint-disable-next-line prefer-destructuring
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 'failed',
      message: 'You are not logged in, Please login first',
    });
  }
  // verifting  the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  const { error } = decoded;
  if (error)
    return res.status(401).json({
      status: 'fail',
      message: 'access denied , login again',
    });

  //check if the user exists in database

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return res.status(401).json({
      status: 'fail',
      message: 'The user no longer exits',
    });
  }
  // checks is user changed password after the token was issued

  if (currentUser.passwordChangedAfter(decoded.iat)) {
    return res.status(401).json({
      status: 'fail',
      message: 'User recently changed the password ! plase login again',
    });
  }

  req.user = currentUser;
  next();
});

const Restrict = (...roles) => {
  return (req, res, next) => {
    //roles is an array , example in this case it might be ['user','admin','lead-guide']

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        status: 'fail',
        message: 'permission denied, you are allowed to perform this action',
      });
    }

    next();
  };
};

module.exports = {
  Protected,
  Restrict,
};
