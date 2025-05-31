const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Team=require('../models/Team');
const mongoose = require('mongoose')
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};


exports.teamLogin= async (req, res) => {
  const { teamId } = req.body;
  if (!teamId) {
    return res.status(400).json({ message: 'Team ID is required' });
  }
  if (!mongoose.Types.ObjectId.isValid(teamId)) {
    return res.status(400).json({ message: 'Invalid Team ID' });
  }

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    return res.status(200).json({
      message: 'Team login successful',
      teamId: team._id,
      teamName: team.teamName,
      location: team.location,
      status: team.status,
      phoneNumber: team.phoneNumber,
    });
  } catch (error) {
    console.error('Team login error:', error.message);
    return res.status(500).json({ message: 'Server error during team login' });
  }
};
