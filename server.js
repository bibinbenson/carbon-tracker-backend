const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/emissions", (req, res) => {
  const { distance, transportMode, energyUsage, meatMeals } = req.body;
  
  // Example AI recommendation logic
  let emissionReductionSuggestions = [];
  if (transportMode === "car") {
    emissionReductionSuggestions.push("Consider using public transport or a bicycle to reduce emissions.");
  }

  // Dummy emission calculation
  const totalEmissions = (distance * 0.2) + (energyUsage * 0.5) + (meatMeals * 0.1);

  res.json({ totalEmissions, suggestions: emissionReductionSuggestions });
});

const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
