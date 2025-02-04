const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');
const UserChallenge = require('../models/UserChallenge');

router.get('/active', async (req, res) => {
  try {
    const challenges = await Challenge.find({ isActive: true });
    res.json(challenges);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/accept', async (req, res) => {
  try {
    const { userId, challengeId } = req.body;
    const userChallenge = new UserChallenge({
      userId,
      challengeId,
      startDate: new Date(),
      progress: 0
    });
    await userChallenge.save();
    res.status(201).json(userChallenge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/update-progress', async (req, res) => {
  try {
    const { userChallengeId, progress } = req.body;
    const userChallenge = await UserChallenge.findByIdAndUpdate(
      userChallengeId,
      { progress },
      { new: true }
    );
    res.json(userChallenge);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
