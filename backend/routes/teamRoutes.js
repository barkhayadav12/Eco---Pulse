const express = require('express');
const Team = require('../models/Team');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { teamName, location, phoneNumber } = req.body;

  if (!teamName || !location || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const team = new Team({
    teamName,
    location,
    phoneNumber,
  });

  try {
    const savedTeam = await team.save();
    res.status(201).json(savedTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const { status } = req.body;
    team.status = status || team.status;

    const updatedTeam = await team.save();
    res.json(updatedTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
