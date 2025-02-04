const tf = require('@tensorflow/tfjs-node');

let model;
(async () => {
  try {
    model = await tf.loadLayersModel('file://./models/emissions_model/model.json');
  } catch (error) {
    console.error('Error loading model:', error);
  }
})();

const predictEmissions = async (userData) => {
  try {
    const { distance, energyUsage, meatMeals } = userData;
    
    // Normalize input data
    const input = tf.tensor2d([[
      distance / 1000, // normalize to thousands
      energyUsage / 100,
      meatMeals / 21
    ]]);
    
    const prediction = await model.predict(input);
    const projected = prediction.dataSync()[0] * 100; // denormalize
    
    return {
      projected: Math.round(projected * 100) / 100,
      potentialReduction: Math.round((1 - projected / 100) * 100),
      recommendations: generateRecommendations(userData)
    };
  } catch (error) {
    throw new Error('Failed to generate prediction');
  }
};

const generateTips = async (userProfile) => {
  const tips = [];
  const { distance, energyUsage, meatMeals } = userProfile;

  if (distance > 100) {
    tips.push({
      category: 'TRANSPORT',
      content: 'Consider using public transport or carpooling',
      impact: Math.round(distance * 0.1)
    });
  }

  if (energyUsage > 200) {
    tips.push({
      category: 'ENERGY',
      content: 'Switch to energy-efficient appliances',
      impact: Math.round(energyUsage * 0.2)
    });
  }

  if (meatMeals > 5) {
    tips.push({
      category: 'FOOD',
      content: 'Try plant-based alternatives for some meals',
      impact: Math.round(meatMeals * 2.5)
    });
  }

  return tips;
};

const generateRecommendations = (userData) => {
  const recommendations = [];
  // Add your recommendation logic here
  return recommendations;
};

module.exports = {
  predictEmissions,
  generateTips
};
