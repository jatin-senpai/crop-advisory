
import sys
import joblib

soil, water, season = sys.argv[1], sys.argv[2], sys.argv[3]

model = joblib.load("crop_model.pkl")
le_soil = joblib.load("soil_encoder.pkl")
le_water = joblib.load("water_encoder.pkl")
le_season = joblib.load("season_encoder.pkl")
le_crop = joblib.load("crop_encoder.pkl")

soil = le_soil.transform([soil])[0]
water = le_water.transform([water])[0]
season = le_season.transform([season])[0]

prediction = model.predict([[soil, water, season]])
crop = le_crop.inverse_transform(prediction)

print(crop[0])

