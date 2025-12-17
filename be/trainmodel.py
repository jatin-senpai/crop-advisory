import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
import joblib


data = pd.read_csv("crop_data.csv")


le_soil = LabelEncoder()
le_water = LabelEncoder()
le_season = LabelEncoder()
le_crop = LabelEncoder()

data["soil"] = le_soil.fit_transform(data["soil"])
data["water"] = le_water.fit_transform(data["water"])
data["season"] = le_season.fit_transform(data["season"])
data["crop"] = le_crop.fit_transform(data["crop"])

X = data[["soil", "water", "season"]]
y = data["crop"]


model = DecisionTreeClassifier()
model.fit(X, y)


joblib.dump(model, "crop_model.pkl")
joblib.dump(le_soil, "soil_encoder.pkl")
joblib.dump(le_water, "water_encoder.pkl")
joblib.dump(le_season, "season_encoder.pkl")
joblib.dump(le_crop, "crop_encoder.pkl")

print("Model trained successfully")
