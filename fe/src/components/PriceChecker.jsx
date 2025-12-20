import React, { useState } from "react";
import { Search, MapPin, IndianRupee, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import api from "../lib/api";

export function PriceChecker() {
    const [crop, setCrop] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const checkPrice = async (e) => {
        e.preventDefault();
        if (!crop) return;
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await api.get(`/prices?crop=${crop}`);
            if (res.data.message && !res.data.price) {
                setError(res.data.message);
            } else {
                setResult(res.data);
            }
        } catch (err) {
            setError("Failed to fetch prices.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                        <IndianRupee className="h-6 w-6" />
                    </div>
                    <CardTitle>Mandi Prices</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={checkPrice} className="flex gap-2 mb-6">
                    <Input
                        placeholder="Enter crop (e.g. Wheat, Rice)"
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? "Checking..." : <Search className="h-4 w-4" />}
                    </Button>
                </form>

                {error && (
                    <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="p-4 rounded-xl border border-green-100 bg-green-50/50">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-bold text-lg capitalize">{result.crop}</h4>
                                    <p className="text-stone-500 text-sm flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> {result.market}, {result.district}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-green-700">₹{result.price}</div>
                                    <div className="text-xs text-stone-500">per quintal</div>
                                </div>
                            </div>
                            <div className="text-xs text-stone-400 mt-2 flex justify-between">
                                <span>Updated: {result.date}</span>
                                <span className="font-medium text-stone-600">{result.state}</span>
                            </div>
                        </div>
                        {result.note && (
                            <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-3 rounded-lg">
                                <Truck className="h-4 w-4 shrink-0 mt-0.5" />
                                {result.note}
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
