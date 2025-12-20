import React, { useState } from "react";
import { Sprout, Droplets, Sun, Ruler, Calculator, Calendar, ChevronDown, ChevronUp, TrendingUp, AlertTriangle, Lightbulb, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import api from "../lib/api";

export function Advisory() {
    const [formData, setFormData] = useState({
        soil: "Loamy",
        water: "Medium",
        season: "Rabi",
        landArea: "1" // Default 1 acre
    });
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [prices, setPrices] = useState({}); // Cache prices for estimation
    const [expandedCrop, setExpandedCrop] = useState(null); // Track which card is expanded

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getRecommendations = async () => {
        setLoading(true);
        try {
            const res = await api.post("/crop/recommend", formData);
            setRecommendations(res.data);
            // Fetch prices for profit calc in background
            res.data.forEach(crop => fetchEstimatedPrice(crop.crop));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchEstimatedPrice = async (cropName) => {
        if (prices[cropName]) return;
        try {
            const res = await api.get(`/prices?crop=${cropName}`);
            if (res.data.price) {
                setPrices(prev => ({ ...prev, [cropName]: res.data.price }));
            }
        } catch (e) {
            // ignore
        }
    };

    // Helper to calculate profit
    const calculateProfit = (crop) => {
        const yieldPerAcre = crop.avgYield; // quintals
        const area = parseFloat(formData.landArea) || 1;
        const price = prices[crop.crop]; // ₹ / quintal

        if (!price) return null;
        const grossIncome = yieldPerAcre * area * price;
        return `₹${grossIncome.toLocaleString()}`;
    };

    const toggleExpand = (cropName) => {
        setExpandedCrop(expandedCrop === cropName ? null : cropName);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                            <Sprout className="h-6 w-6" />
                        </div>
                        <CardTitle>AI Crop Advisor</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2"><Sun className="h-4 w-4" /> Season</label>
                            <select name="season" className="w-full p-2 rounded-md border" onChange={handleChange} value={formData.season}>
                                <option value="Rabi">Rabi (Winter)</option>
                                <option value="Kharif">Kharif (Monsoon)</option>
                                <option value="Zaid">Zaid (Summer)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2"><Ruler className="h-4 w-4" /> Soil Type</label>
                            <select name="soil" className="w-full p-2 rounded-md border" onChange={handleChange} value={formData.soil}>
                                <option value="Loamy">Loamy</option>
                                <option value="Clay">Clay</option>
                                <option value="Sandy">Sandy</option>
                                <option value="Black Soil">Black Soil</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2"><Droplets className="h-4 w-4" /> Water Availability</label>
                            <select name="water" className="w-full p-2 rounded-md border" onChange={handleChange} value={formData.water}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2"><Ruler className="h-4 w-4" /> Land Area (Acres)</label>
                            <Input type="number" name="landArea" value={formData.landArea} onChange={handleChange} />
                        </div>
                    </div>
                    <Button onClick={getRecommendations} className="mt-6 w-full" size="lg" disabled={loading}>
                        {loading ? "Analyzing Soil..." : "Get Recommendations"}
                    </Button>
                </CardContent>
            </Card>

            {recommendations.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 duration-700">
                    {recommendations.map((item, idx) => (
                        <Card key={idx} className={`overflow-hidden border-t-4 border-t-green-500 hover:shadow-lg transition-all duration-300 ${expandedCrop === item.crop ? 'md:col-span-2 md:row-span-2' : ''}`}>
                            <CardContent className="pt-6 h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold text-stone-900">{item.crop}</h3>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                            {item.score >= 5 ? "Best Match" : "Good Match"}
                                        </span>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm border-b border-stone-100 pb-2">
                                            <span className="text-stone-500">Exp. Yield</span>
                                            <span className="font-semibold">{item.avgYield} q/acre</span>
                                        </div>
                                        <div className="flex justify-between text-sm border-b border-stone-100 pb-2">
                                            <span className="text-stone-500">Season</span>
                                            <span className="font-semibold">{item.season}</span>
                                        </div>
                                    </div>

                                    {calculateProfit(item) ? (
                                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100 mb-4">
                                            <div className="flex items-center gap-2 text-yellow-700 mb-1">
                                                <Calculator className="h-4 w-4" />
                                                <span className="text-xs font-bold uppercase tracking-wide">Est. Revenue</span>
                                            </div>
                                            <div className="text-2xl font-bold text-stone-900">{calculateProfit(item)}</div>
                                            <div className="text-xs text-stone-400 mt-1">Based on current market price</div>
                                        </div>
                                    ) : (
                                        <div className="mb-4 text-xs text-center text-stone-400 italic">
                                            Live market price unavailable
                                        </div>
                                    )}
                                </div>

                                {/* Fertilizer Section Toggle */}
                                <div className="mt-auto">
                                    {expandedCrop === item.crop && (
                                        <div className="mt-4 pt-4 border-t border-stone-100 animate-in fade-in duration-300 space-y-6">

                                            {/* Quick Stats Grid */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-stone-50 p-3 rounded-lg">
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase mb-1">
                                                        <TrendingUp className="h-3 w-3" /> Demand
                                                    </div>
                                                    <div className="text-sm font-semibold">{item.marketDemand || "Stable"}</div>
                                                </div>
                                                <div className="bg-red-50 p-3 rounded-lg">
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-red-500 uppercase mb-1">
                                                        <AlertTriangle className="h-3 w-3" /> Risk
                                                    </div>
                                                    <div className="text-sm font-semibold text-stone-700">{item.riskFactor || "Low"}</div>
                                                </div>
                                            </div>

                                            {/* Intercropping */}
                                            {item.intercropping && (
                                                <div>
                                                    <h4 className="font-semibold text-stone-700 flex items-center gap-2 mb-2 text-sm">
                                                        <Users className="h-4 w-4 text-blue-500" /> Companion Crops (Intercropping)
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.intercropping.map((c, i) => (
                                                            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-100">
                                                                {c}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Fertilizer Schedule */}
                                            {item.fertilizers && (
                                                <div>
                                                    <h4 className="font-semibold text-green-700 flex items-center gap-2 mb-3">
                                                        <Calendar className="h-4 w-4" /> Fertilizer Schedule
                                                    </h4>
                                                    <div className="relative pl-4 border-l-2 border-green-200 space-y-4">
                                                        {item.fertilizers.map((fert, fIdx) => (
                                                            <div key={fIdx} className="relative">
                                                                <div className="absolute -left-[21px] top-1.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white ring-1 ring-green-200"></div>
                                                                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">{fert.when}</p>
                                                                <p className="text-sm font-medium text-stone-900 mt-0.5">
                                                                    {fert.name} — <span className="text-green-600">{fert.quantity}</span>
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Pro Tip */}
                                            {item.proTip && (
                                                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex gap-3">
                                                    <Lightbulb className="h-5 w-5 text-indigo-600 shrink-0" />
                                                    <div>
                                                        <h5 className="text-xs font-bold text-indigo-800 uppercase tracking-wide mb-1">Expert Farmer Tip</h5>
                                                        <p className="text-sm text-indigo-900 leading-relaxed font-medium">
                                                            "{item.proTip}"
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <Button
                                        variant="ghost"
                                        className="w-full mt-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                                        onClick={() => toggleExpand(item.crop)}
                                    >
                                        {expandedCrop === item.crop ? (
                                            <>Hide Details <ChevronUp className="ml-2 h-4 w-4" /></>
                                        ) : (
                                            <>View Full Guide <ChevronDown className="ml-2 h-4 w-4" /></>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
