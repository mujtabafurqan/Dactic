/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const User = require('../models/user.model');
const Chat = require('../models/chat.model');
const Discipline = require('../models/disciples.model');

const getDisciplines = (req, res) => {
  const discs = {};
  Discipline.find({}, (err, disciplines) => {
    if (err) res.status(500).send(err._message);
    else {
      disciplines.forEach(discipline => {
        discs[discipline.name] = discipline.subDisciplines;
      });
      res.status(200).send(JSON.stringify(discs));
    }
  });
};
const createChat = async (req, res) => {
  const { body, user } = req;
  const listOfEligibleExperts = [];

  const expertList = await User.find({
    role: 'expert',
    subDisciplines: body.subDiscipline,
  });
  expertList.forEach(expert => {
    listOfEligibleExperts.push(expert._id.toString());
  });

  const message = {
    content: `${body.description}`,
    linksReferred: `${body.linksReferred}`,
    readStatus: false,
    timestamp: Date.now(),
    userOrExpertId: user.id,
    userOrExpertName: user.name,
  };
  const messages = [message];
  const newChat = new Chat({
    userId: user.id,
    userName: user.name,
    discipline: body.discipline,
    subDiscipline: body.subDiscipline,
    title: body.title,
    linksReferred: body.linksReferred,
    description: body.description,
    listOfEligibleExperts,
    expertUnreadCount: 0,
    userUnreadCount: 0,
    status: 'created',
    startedTimestamp: Date.now(),
    lastUpdatedTimestamp: Date.now(),
    messages,
  });
  console.log(`chat : ${newChat.toString()}`);

  newChat.save((err, chat) => {
    if (err) res.status(400).send(err._message);
    else {
      res.status(201).send(chat._id);
    }
  });
};

const getChat = (req, res) => {
  const { query } = req;
  Chat.findById(query.chatId, (err, chat) => {
    if (err) res.status(500).send(err._message);
    else if (chat == null) res.status(404).send({ message: 'Chat Not Found' });
    else res.status(200).send(chat);
  });
};

const newMessage = (req, res) => {
  console.log('req user', req.user);
  const { params, body, user } = req;

  Chat.findById(params.chatId, (err, chat) => {
    if (err || chat == null) {
      if (err) res.status(500).send(err._message);
      res.status(404).send({ message: 'Chat Not Found' });
    } else {
      body.message.timestamp = Date.now();
      body.message.userOrExpertId = user.id;
      body.message.role = user.role;
      body.message.userOrExpertName = user.name;

      const messagesNew = chat.messages;
      messagesNew.push(body.message);

      if (user.role === 'user') {
        const unreadCount = chat.expertUnreadCount + 1;
        chat.updateOne(
          {
            messages: messagesNew,
            lastUpdatedTimestamp: Date.now(),
            expertUnreadCount: unreadCount,
          },
          err1 => {
            if (err1) {
              console.error(err1);
              res.status(500).send(err1._message);
            } else {
              res.status(200).send({ message: 'Updated' });
            }
          },
        );
      } else {
        const unreadCount = chat.userUnreadCount + 1;
        chat.updateOne(
          {
            messages: messagesNew,
            lastUpdatedTimestamp: Date.now(),
            userUnreadCount: unreadCount,
          },
          err1 => {
            if (err1) res.status(500).send(err1._message);
            else {
              res.status(200).send({ message: 'Updated' });
            }
          },
        );
      }
    }
  });
};

const updateReadStatus = async (req, res) => {
  const { params, user } = req;
  const chat = await Chat.findById(params.chatId);
  if (chat == null) res.status(404).send({ message: 'Chat Not Found' });

  const messagesNew = chat.messages;
  chat.messages.map(msg => {
    if (msg.role !== user.role) {
      msg.readStatus = true;
      return msg;
    }
    return msg;
  });

  if (user.role === 'user') {
    chat.updateOne(
      {
        messages: messagesNew,
        lastUpdatedTimestamp: Date.now(),
        userUnreadCount: 0,
      },
      err => {
        if (err) res.status(500).send(err._message);
        else {
          res.status(200).send({ message: 'Updated' });
        }
      },
    );
  } else {
    chat.updateOne(
      {
        messages: messagesNew,
        lastUpdatedTimestamp: Date.now(),
        expertUnreadCount: 0,
      },
      err => {
        if (err) res.status(500).send(err._message);
        else {
          res.status(200).send({ message: 'Updated' });
        }
      },
    );
  }
};

const closeChat = async (req, res) => {
  const { params } = req;
  const chat = await Chat.findById(params.chatId);
  if (chat == null) res.status(404).send('Chat not found');
  chat.status = 'closed';
  chat.lastUpdatedTimestamp = Date.now();

  chat.save((err1, chat) => {
    if (err1) res.status(400).send(err1._message);
    else {
      res.status(201).send({ message: 'Chat Closed' });
    }
  });
};

const OpenChats = (req, res) => {
  const { user } = req;
  if (user.role === 'user') {
    Chat.find(
      { userId: user.id, status: { $in: ['open', 'created'] } },
      (err, chats) => {
        if (err) res.sendStatus(500).send(err._message);
        else if (chats.length === 0)
          res.status(404).send({ message: 'No chats found for user' });
        else res.status(200).send(chats);
      },
    );
  } else if (user.role === 'expert') {
    Chat.find({ expertId: user.id, status: 'open' }, (err, chats) => {
      if (err) res.sendStatus(500).send(err._message);
      else if (chats.length === 0)
        res.status(404).send({ message: 'No chats found for expert' });
      else res.status(200).send(chats);
    });
  }
};

const getHistory = (req, res) => {
  const { user } = req;
  if (user.role === 'user') {
    Chat.find({ userId: user.id, status: 'closed' }, (err, chats) => {
      if (err) res.sendStatus(500).send(err._message);
      else if (chats.length === 0)
        res.status(404).send({ message: 'No chats found for user' });
      else res.status(200).send(chats);
    });
  } else if (user.role === 'expert') {
    Chat.find({ expertId: user.id, status: 'closed' }, (err, chats) => {
      if (err) res.sendStatus(500).send(err._message);
      else if (chats.length === 0)
        res.status(404).send({ message: 'No chats found for expert' });
      else res.status(200).send(chats);
    });
  }
};

const getUnacceptedChats = async (req, res) => {
  const { user } = req;
  Chat.find(
    {
      status: 'created',
      listOfEligibleExperts: user.id,
    },
    (err1, chats) => {
      if (err1) res.sendStatus(500).send(err1._message);
      else if (chats.length === 0)
        res.status(404).send({ message: 'No chats found' });
      else res.status(200).send(chats);
    },
  );
};

const acceptOrDeclineChat = async (req, res) => {
  const { params, body, user } = req;
  console.log('req.user', req.user);
  const chat = await Chat.findById(params.chatId);
  if (chat == null) res.status(404).send({ message: 'No chats found' });
  else if (body.accepted) {
    chat.expertId = user.id;
    chat.expertName = user.name;
    chat.status = 'open';
    chat.listOfEligibleExperts = [];
    chat.lastUpdatedTimestamp = Date.now();
    chat.save(err1 => {
      if (err1) {
        console.error(err1);
        res.status(500).send(err1._message);
      } else {
        res.status(200).send({ message: 'Updated' });
      }
    });
  } else if (!body.accepted) {
    const expertList = chat.listOfEligibleExperts;
    console.log('exert1', expertList);
    const index = expertList.indexOf(user.id);
    if (index > -1) {
      expertList.splice(index, 1);
    }
    console.log('exert2', expertList);
    chat.listOfEligibleExperts = expertList;
    chat.lastUpdatedTimestamp = Date.now();
    chat.save(err1 => {
      if (err1) {
        console.log('err', err1);
        res.status(500).send(err1._message);
      } else {
        res.status(200).send({ message: 'Updated' });
      }
    });
  }
};

const addExpertDetails = async (req, res) => {
  const { user, body } = req;
  const expert = await User.findById(user.id);
  if (expert == null || expert.length === 0)
    res.status(404).send({ message: 'No experts found for this id' });
  else {
    expert.disciplines = body.disciplines;
    expert.subDisciplines = body.subDisciplines;
    expert.workHistory = body.workHistory;
    expert.skills = body.skills;
    expert.country = body.country;
    expert.contactNo = body.contactNo;
    expert.occupation = body.occupation;
    expert.designation = body.designation;
    expert.joinedDate = Date.now();
    expert.detailsAdded = true;

    const savedExpert = await expert.save();

    const chats = await Chat.find({
      status: 'created',
      subDiscipline: { $in: body.subDisciplines },
    });
    if (chats.length === 0) res.status(200).send({});
    else {
      chats.forEach(chat => {
        const expertList = chat.listOfEligibleExperts;
        expertList.push(savedExpert._id.toString());
        chat.lastUpdatedTimestamp = Date.now();
        chat.save((err3, chat) => {
          if (err3)
            res
              .status(500)
              .send({ message: 'Failed while added expert to chats' });
        });
      });
      res.status(200).send({});
    }
  }
};

const createBasicUser = (req, res) => {
  const { body } = req;
  const user = new User({
    name: body.name,
    email: body.email,
    role: body.role,
    google: body.googleId,
  });
  user.save((err, usr) => {
    if (err) res.status(400).send(err._message);
    else {
      res.status(201).send(usr._id);
    }
  });
};

const getUserDetails = async (req, res) => {
  const { user } = req;
  const userFromDb = await User.findById(user.id);
  if (user == null) res.status(404).send({ message: 'User not found' });

  res.status(200).send(userFromDb);
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
  getDisciplines,
  getUserDetails,
};
