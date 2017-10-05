const nodemailer = require('nodemailer');
const promisify = require('es6-promisify');
// const htmlToText = require('html-to-text');

//my mailgun credentials
const transport = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 2525,
  auth: {
    user: "postmaster@sandboxc3c74c065d204229925422e847a1e527.mailgun.org",
    pass: "2ec7e996359ab3b6414db924f37dcba4"
  }
});

exports.send = async (options) => {
  const mailOptions = {
    from: 'Charles Chreznor <chreznor@gmail.com>',
    to: options.user.email,
    subject: 'Thanks for the sign up!',
    html: options.html,
    text: 'Hello'
  }
  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);
};
