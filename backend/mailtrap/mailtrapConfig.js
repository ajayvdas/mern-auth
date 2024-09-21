const { MailtrapClient } = require("mailtrap");

const TOKEN = "ec98bae17b33d436ae9d86a2b540600e";

const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "ajay",
};
// const recipients = [
//   {
//     email: "ajayvdas2@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     html: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);

// module.exports = mailtrapClient
// module.exports = sender

exports.mailtrapClient = mailtrapClient;
exports.sender = sender;