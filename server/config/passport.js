/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Strategy: LinkedInStrategy } = require('passport-linkedin-oauth2');
// const _ = require('lodash');
const moment = require('moment');
const config = require('../config/config');
const User = require('../models/user.model');

/**
 * Sign in with Google.
 */
const googleStrategyConfig = new GoogleStrategy(
  {
    clientID: config.google.id,
    clientSecret: config.google.secret,
    callbackURL: `${config.baseURL}/auth/google/callback`,
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, params, profile, done) => {
    const { state } = req.query;
    const { role } = JSON.parse(Buffer.from(state, 'base64').toString());
    if (req.user) {
      User.findOne({ google: profile.id }, (err, existingUser) => {
        if (err) {
          return done(err);
        }
        if (existingUser && existingUser.id !== req.user.id) {
          req.flash('errors', {
            msg:
              'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.',
          });
          done(err);
        } else {
          User.findById(req.user.id, (err1, user) => {
            const userInDb = user;
            if (err1) {
              return done(err1);
            }
            userInDb.google = profile.id;
            userInDb.tokens.push({
              kind: 'google',
              accessToken,
              accessTokenExpires: moment()
                .add(params.expires_in, 'seconds')
                .format(),
              refreshToken,
            });
            userInDb.name = user.name || profile.displayName;
            userInDb.gender = user.gender || profile._json.gender;
            userInDb.picture = user.picture || profile._json.picture;
            userInDb.role = role;
            userInDb.save(err2 => {
              req.flash('info', { msg: 'Google account has been linked.' });
              done(err2, user);
            });
          });
        }
      });
    } else {
      User.findOne({ google: profile.id }, (err, existingUser) => {
        if (err) {
          return done(err);
        }
        if (existingUser) {
          return done(null, existingUser);
        }
        User.findOne(
          { email: profile.emails[0].value },
          (err1, existingEmailUser) => {
            if (err1) {
              return done(err1);
            }
            if (existingEmailUser) {
              req.flash('errors', {
                msg:
                  'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.',
              });
              done(err1);
            } else {
              const user = new User();
              user.email = profile.emails[0].value;
              user.google = profile.id;
              user.tokens.push({
                kind: 'google',
                accessToken,
                accessTokenExpires: moment()
                  .add(params.expires_in, 'seconds')
                  .format(),
                refreshToken,
              });
              user.name = profile.displayName;
              user.gender = profile._json.gender;
              user.picture = profile._json.picture;
              user.role = role;
              user.save(err2 => {
                done(err2, user);
              });
            }
          },
        );
      });
    }
  },
);

/**
 * Sign in with LinkedIn.
 */
const linkdInStrategyConfig = new LinkedInStrategy(
  {
    clientID: config.linkedIn.id,
    clientSecret: config.linkedIn.secret,
    callbackURL: `${config.baseURL}/auth/linkedin/callback`,
    scope: ['r_fullprofile', 'r_emailaddress'],
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, profile, done) => {
    console.log(profile);
    if (req.user) {
      User.findOne({ linkedin: profile.id }, (err, existingUser) => {
        if (err) {
          return done(err);
        }
        if (existingUser) {
          req.flash('errors', {
            msg:
              'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.',
          });
          done(err);
        } else {
          User.findById(req.user.id, (err1, user) => {
            const userLinkedin = user;
            if (err1) {
              return done(err1);
            }
            userLinkedin.linkedIn = profile.id;
            userLinkedin.tokens.push({ kind: 'linkedin', accessToken });
            userLinkedin.name = user.name || profile.displayName;
            userLinkedin.picture = user.picture || profile.photos[3].value;
            userLinkedin.save(err2 => {
              if (err2) {
                return done(err2);
              }
              // req.flash('info', { msg: 'LinkedIn account has been linked.' });
              done(err2, user);
            });
          });
        }
      });
    } else {
      User.findOne({ linkedin: profile.id }, (err, existingUser) => {
        if (err) {
          return done(err);
        }
        if (existingUser) {
          return done(null, existingUser);
        }
        User.findOne(
          { email: profile.emails[0].value },
          (err1, existingEmailUser) => {
            if (err1) {
              return done(err1);
            }
            if (existingEmailUser) {
              // TO-DO: Analyse these conditions more carefully
              // req.flash('errors', {
              //   msg:
              //     'There is already an account using this email address. Sign in to that account and link it with LinkedIn manually from Account Settings.',
              // });
              // done(err);
              done(null, existingEmailUser);
            } else {
              const user = new User();
              user.linkedin = profile.id;
              user.tokens.push({ kind: 'linkedin', accessToken });
              user.email = profile.emails[0].value;
              user.name = profile.displayName;
              user.picture = user.picture || profile.photos[3].value;
              user.save(err2 => {
                done(err2, user);
              });
            }
          },
        );
      });
    }
  },
);

module.exports = {
  googleStrategy: googleStrategyConfig,
  linkedInStrategy: linkdInStrategyConfig,
};
