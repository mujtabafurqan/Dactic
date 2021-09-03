const Joi = require('@hapi/joi');

const createChat = {
  body: Joi.object().keys({
    discipline: Joi.string().required(),
    subDiscipline: Joi.string().required(),
    title: Joi.string().required(),
    linksReferred: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const getChat = {
  query: Joi.object().keys({
    chatId: Joi.string().required(),
  }),
};

const newMessage = {
  params: Joi.object().keys({
    chatId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    message: Joi.object().keys({
      content: Joi.string().required(),
      readStatus: Joi.boolean().required(),
    }),
  }),
};

const updateReadStatus = {
  params: Joi.object().keys({
    chatId: Joi.string().required(),
  }),
};

const closeChat = {
  params: Joi.object().keys({
    chatId: Joi.string().required(),
  }),
};

const OpenChats = {};
const getHistory = {};

const getUnacceptedChats = {};

const acceptOrDeclineChat = {
  params: Joi.object().keys({
    chatId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    accepted: Joi.boolean().required(),
  }),
};

const addExpertDetails = {
  body: Joi.object().keys({
    disciplines: Joi.array(),
    subDisciplines: Joi.array(),
    workHistory: Joi.array(),
    skills: Joi.string(),
    country: Joi.string().required(),
    contactNo: Joi.string().required(),
    occupation: Joi.string(),
    designation: Joi.string(),
  }),
};

const createBasicUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string(),
    role: Joi.string().required(),
    google: Joi.string(),
  }),
};
module.exports = {
  createChat,
  getChat,
  newMessage,
  updateReadStatus,
  closeChat,
  OpenChats,
  getHistory,
  getUnacceptedChats,
  acceptOrDeclineChat,
  addExpertDetails,
  createBasicUser,
};
