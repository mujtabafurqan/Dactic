const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  authService,
  userService,
  tokenService,
  emailService,
} = require('../services');
const User = require('../models/user.model');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = (req, res) => {
  console.log(req.user);
  // const { email, password } = req.body;
  // const user = await authService.loginUserWithEmailAndPassword(email, password);
  // const tokens = await tokenService.generateAuthTokens(user);
  // res.send({ user, tokens });
  res.status(200);
};

const logout = catchAsync(async (req, res) => {
  await authService.logout(req, res);
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email,
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const getUserProfile = async (req, res) => {
  console.log('reached pofile controller', req.user);
  if (req.user) {
    res.status(200).send(JSON.stringify(req.user));
  } else {
    res.status(200).send(JSON.stringify({ name: 'usavfasidvbla' }));
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  getUserProfile,
};
