const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const User = require('../models/user.model');
const { tokenTypes } = require('../config/tokens');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (req, res) => {
  req.logout();
  req.session.destroy(err => {
    if (err)
      console.log('Error : Failed to destroy the session during logout.', err);
    req.user = null;
    res.redirect('/');
  });
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async refreshToken => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH,
    );
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD,
    );
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
    await userService.updateUserById(user.id, { password: newPassword });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

const getUserDetails = async (req, res) => {
  const { user } = req;
  const userFromDb = await User.findById(user.id);
  if (userFromDb === null)
    res.status(404).send({ message: 'User not found in DB' });

  const userDetails = {
    role: userFromDb.role,
    disciplines: userFromDb.disciplines,
    subDisciplines: userFromDb.subDisciplines,
    workHistory: userFromDb.workHistory,
    skills: userFromDb.skills,
    email: userFromDb.email,
    google: userFromDb.google,
    name: userFromDb.name,
    picture: userFromDb.picture,
    id: userFromDb.id,
    isAuthenticated: true,
  };

  res.status(200).send(userDetails);
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  getUserDetails,
};
