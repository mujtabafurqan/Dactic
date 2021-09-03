/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const validate = require('../../middlewares/validate');
const dashboardValidation = require('../../validations/dashboard.validation');
const dashboardService = require('../../services/dashboard.service');

const router = express.Router();

router.route('/getDisciplines').get(dashboardService.getDisciplines);

router
  .route('/createChat')
  .post(validate(dashboardValidation.createChat), dashboardService.createChat);

router
  .route('/getChat')
  .get(validate(dashboardValidation.getChat), dashboardService.getChat);

router
  .route('/newMessage/:chatId')
  .put(validate(dashboardValidation.newMessage), dashboardService.newMessage);

router
  .route('/updateReadStatus/:chatId')
  .put(
    validate(dashboardValidation.updateReadStatus),
    dashboardService.updateReadStatus,
  );

router
  .route('/closeChat/:chatId')
  .put(validate(dashboardValidation.closeChat), dashboardService.closeChat);

router
  .route('/openChats')
  .get(validate(dashboardValidation.openChats), dashboardService.OpenChats);

router
  .route('/getHistory')
  .get(validate(dashboardValidation.getHistory), dashboardService.getHistory);

router
  .route('/getUnacceptedChats')
  .get(
    validate(dashboardValidation.getUnacceptedChats),
    dashboardService.getUnacceptedChats,
  );

router
  .route('/acceptOrDeclineChat/:chatId')
  .put(
    validate(dashboardValidation.acceptOrDeclineChat),
    dashboardService.acceptOrDeclineChat,
  );

router
  .route('/addDetails')
  .put(
    validate(dashboardValidation.addExpertDetails),
    dashboardService.addExpertDetails,
  );

router
  .route('/createBasicUser')
  .post(
    validate(dashboardValidation.createBasicUser),
    dashboardService.createBasicUser,
  );

router.route('/getUserDetails').get(dashboardService.getUserDetails);
module.exports = router;
