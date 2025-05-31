const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: 'Available' },
  phoneNumber: { type: String, required: true },
});

module.exports = mongoose.model('Team', teamSchema);
