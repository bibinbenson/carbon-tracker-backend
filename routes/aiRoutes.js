const express = require('express');
const router = express.Router();
const { predictEmissions, generateTips } = require('../services/aiService');

router.post('/predict', async (req, res) => {
  try {
    const prediction = await predictEmissions(req.body);
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/tips', async (req, res) => {
  try {
    const tips = await generateTips(req.body);
    res.json(tips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
