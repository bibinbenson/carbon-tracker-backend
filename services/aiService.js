// services/aiService.js
const predictEmissions = async (userData) => {
  try {
    const { distance, energyUsage, meatMeals } = userData;
    
    // Simple calculation instead of ML model
    const projected = (distance * 0.2) + (energyUsage * 0.5) + (meatMeals * 2.5);
    
    return {
      projected: Math.round(projected * 100) / 100,
      potentialReduction: Math.round((1 - projected / 1000) * 100),
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
  const recommendations = [
    'Use public transportation when possible',
    'Switch to energy-efficient appliances',
    'Reduce meat consumption'
  ];
  return recommendations;
};

module.exports = {
  predictEmissions,
  generateTips
};
