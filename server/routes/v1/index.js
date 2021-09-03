/* eslint-disable func-names */
const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const dashboardRoute = require('./dashboard.route');

const logger = require('../../logger');

const router = express.Router();
router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);
// eslint-disable-next-line func-names
router.use('/test1', function(req, res) {
  const testObject = {
    name: 'malik',
  };
  logger.mylog(`malikd`, testObject);
  res.status(200).send(testObject);
});

router.use('/dashboard', dashboardRoute);

module.exports = router;
