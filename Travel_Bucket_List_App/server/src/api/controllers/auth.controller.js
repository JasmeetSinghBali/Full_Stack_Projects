const expressJWT = require('express-jwt');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Custom Error handler for error originated from DB
const sgMail = require('@sendgrid/mail');
const { errorHandler } = require('../helpers/dbErrorHandling');

const User = require('../../models/user');

sgMail.setApiKey(process.env.MAIL_KEY);

// Auth and register new User
exports.registerController = (req, res) => {
  const { name, email, password } = req.body;
  // catching validations errors
  const errors = validationResult(req);

  // if errors object is not empty
  if (!errors.isEmpty()) {
    // grab the first error from the object errors
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      error: firstError,
    });
  }
  User.findOne({
    email,
  }).exec((err, user) => {
    // duplicate user detected
    if (user) {
      return res.status(400).json({
        error: 'Email already exists!',
      });
    }
  });
  // If eveything good then Generating Token with payload
  const token = jwt.sign({ name, email, password },
    process.env.JWT_ACCOUNT_ACTIVATION,
    { expiresIn: '30m' });
    // setting up email config
  const emailData = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: 'Account activation link',
    html:
          `<h1>Welcome to Travel-Bucket List !!</h1>
           <img src='https://images.unsplash.com/photo-1499591934245-40b55745b905?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80'/>
           <h2>Please Click the below link to activate your account</h2>
           <a href="${process.env.CORS_ORIGIN}/users/activate/${token}">Activate My Account</a>
           <hr/>
           <p><b>Please do not share this link with anyone.</b></p>
           <a href="${process.env.CORS_ORIGIN}">jassi.dev@outlook.com</a>
           `,
  };
    // send email and handle promise
  sgMail.send(emailData)
    .then(() => res.json({
      message: `Email sent to ${email}`,
    })).catch((err) => res.status(400).json({
      // pass only err during development
      error: errorHandler(err),
    }));
};
