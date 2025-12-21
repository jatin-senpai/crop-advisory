import express from "express";
import middleware from "../middleware.js";
import { cropRules } from "../croprules.js";

const router = express.Router();

router.post("/recommend", middleware, (req, res) => {
  const { soil, water, season, landArea } = req.body;

  const crops = cropRules
    .map(crop => {
      let score = 0;
      if (crop.soil.includes(soil)) score += 2;
      if (crop.water === water) score += 2;
      if (crop.season === season) score += 1;
      return { ...crop, score };
    })
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score);

  res.json(crops.slice(0, 3));
});

export default router;
