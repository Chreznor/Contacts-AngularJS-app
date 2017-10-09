const mongoose = require('mongoose');
const User = mongoose.model('User');
const mail = require('../handlers/mail');


exports.addContact = async (req, res) => {
  //save new contact
  const user = await (new User(req.body)).save();
  res.sendStatus(200);

  //count contacts who are older, younger or of the same age
  const older = await User.find({age: {$gt: parseFloat(user.age)}}).count();
  const younger = await User.find({age: {$lt: parseFloat(user.age)}}).count();
  const same = await User.find({age: {$eq: parseFloat(user.age)}}).count();

  //quick and dirty html template
  let html = (`<h3>Thanks for the Sign Up, ${user.name} ${user.surname}!</h3>
    <p>There ${younger === 0 || younger > 1 ? 'are ' + younger + ' contacts who are' : 'is ' + younger + ' contact who is'} younger than you, ${older === 0 || older > 1 ? older + ' contacts who are' : older + ' contact who is'} older than you, and
    ${(same - 1) === 0 || (same - 1) > 1 ? (same - 1) + ' contacts' : (same - 1) + ' contact'} of the same age.</p>`);

  //this sends the email
  await mail.send({
		user,
		html,
		filename: 'registration'
	})

  console.log('User added');
};

exports.getContacts = async (req, res) => {
  const users = await User.find().sort( { "surname": 1, "age": 1} );
  res.json(users);
};

exports.updateContact = async (req, res) => {
  // find and update the contact
  const updatedUser = await User.findOneAndUpdate({ _id: req.body.id }, req.body, {
  	new: true, // return the new user instead of the old one
  	runValidators: true
  }).exec();
  res.sendStatus(200);
  console.log('Contact updated');
};

exports.deleteContact = async (req, res) => {
  // find and delete the contact
  console.log(req.body._id);
  const deleteUser = await User.findOneAndRemove( {_id: req.body._id} ).exec();
  res.sendStatus(200);
  console.log('Contact deleted');
}
