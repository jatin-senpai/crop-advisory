export const cropRules = [
  {
    crop: "Wheat",
    soil: ["Loamy", "Clay"],
    water: "Medium",
    season: "Rabi",
    avgYield: 18,
    marketDemand: "High",
    riskFactor: "Unseasonal rain at harvesting",
    intercropping: ["Mustard", "Gram"],
    proTip: "Use Late Sown varieties if planting after Dec 15 to avoid heat stress.",
    fertilizers: [
      { name: "DAP", quantity: "55 kg/acre", when: "Basal dose at sowing" },
      { name: "Urea", quantity: "40 kg/acre", when: "First irrigation (CRI stage, 21-25 DAS)" },
      { name: "Urea", quantity: "40 kg/acre", when: "Second node stage (55-60 DAS)" }
    ]
  },
  {
    crop: "Paddy",
    soil: ["Clay", "Black Soil"],
    water: "High",
    season: "Kharif",
    avgYield: 22,
    marketDemand: "Is always stable",
    riskFactor: "Water stagnation > 10 days",
    intercropping: ["Fish (Rice-Fish Farming)", "Azolla"],
    proTip: "Incorporate Green Manure (Dhaincha) 10 days before transplanting to save 20% Urea.",
    fertilizers: [
      { name: "DAP", quantity: "35 kg/acre", when: "Basal dose before transplanting" },
      { name: "Urea", quantity: "30 kg/acre", when: "Active tillering (25-30 DAT)" },
      { name: "Zinc Sulfate", quantity: "10 kg/acre", when: "Basal dose to prevent Khaira disease" },
      { name: "Urea", quantity: "30 kg/acre", when: "Panicle initiation (50-55 DAT)" }
    ]
  },
  {
    crop: "Maize",
    soil: ["Sandy", "Loamy"],
    water: "Medium",
    season: "Kharif",
    avgYield: 20,
    marketDemand: "Increasing (Poultry feed)",
    riskFactor: "Water logging (Very Sensitive)",
    intercropping: ["Soybean", "Cowpea"],
    proTip: "Effective weed management in first 40 days is critical. Use Atrazine.",
    fertilizers: [
      { name: "NPK (12:32:16)", quantity: "50 kg/acre", when: "Basal dose at sowing" },
      { name: "Urea", quantity: "25 kg/acre", when: "Knee high stage (30-35 DAS)" },
      { name: "Urea", quantity: "25 kg/acre", when: "Tasseling stage (55-60 DAS)" }
    ]
  },
  {
    crop: "Cotton",
    soil: ["Black Soil"],
    water: "Low",
    season: "Kharif",
    avgYield: 10,
    marketDemand: "High (Export potential)",
    riskFactor: "Pink Bollworm infestation",
    intercropping: ["Green Gram", "Black Gram"],
    proTip: "Install 5 Pheromone traps/acre at 45 days to monitor Pink Bollworm activity.",
    fertilizers: [
      { name: "DAP", quantity: "50 kg/acre", when: "Basal dose at sowing" },
      { name: "Urea", quantity: "45 kg/acre", when: "Square formation (45-50 DAS)" },
      { name: "MOP (Potash)", quantity: "30 kg/acre", when: "Peak flowering (70-75 DAS)" }
    ]
  }
];
