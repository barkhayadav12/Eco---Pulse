const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  location: String,
  latitude: Number,
  longitude: Number,
  wasteType: String,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
  assignedDate: Date,
});

module.exports = mongoose.model('Report', reportSchema);
