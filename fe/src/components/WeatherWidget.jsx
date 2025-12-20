import React, { useEffect, useState } from "react";
import { Cloud, Droplets, Wind, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import api from "../lib/api";

export function WeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/weather")
            .then(res => setWeather(res.data))
            .catch(err => console.error("Weather fetch error", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="h-48 animate-pulse rounded-xl bg-stone-200"></div>;
    if (!weather) return null;

    return (
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none shadow-lg">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                        <MapPin className="h-5 w-5" /> {weather.name}
                    </CardTitle>
                    <span className="text-sm opacity-90 capitalize">{weather.weather[0].description}</span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-end justify-between">
                    <div>
                        <div className="text-6xl font-bold">{Math.round(weather.main.temp)}°</div>
                        <div className="text-blue-100 mt-1">
                            H: {Math.round(weather.main.temp_max)}° L: {Math.round(weather.main.temp_min)}°
                        </div>
                    </div>
                    <Cloud className="h-16 w-16 opacity-80" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm font-medium">
                    <div className="flex items-center gap-2 rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                        <Droplets className="h-4 w-4" /> Humidity: {weather.main.humidity}%
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                        <Wind className="h-4 w-4" /> Wind: {weather.wind.speed} m/s
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
