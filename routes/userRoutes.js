const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/update-points', async (req, res) => {
  try {
    const { userId, points } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { points: points } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    const leaders = await User.find()
      .sort({ points: -1 })
      .limit(10)
      .select('username points achievements');
    res.json(leaders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
