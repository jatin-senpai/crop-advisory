import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import api from "../lib/api";
import { Sprout } from "lucide-react";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        pincode: "" // Must be string? Schema says Number in DB but Pincode usually treated as string/number safely validation..
    });
    // Be/types.js likely uses zod. Let's assume number from API usage or string parsed.
    // DB schema says pincode: Number. I should parse it.

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/signup", {
                ...formData,
                pincode: formData.pincode // Send as string to match z.string().length(6) in backend
            });
            navigate("/login");
        } catch (err) {
            if (err.response?.data?.errors) {
                setError(JSON.stringify(err.response.data.errors));
            } else {
                setError(err.response?.data?.message || "Signup failed");
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-stone-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                        <Sprout className="h-6 w-6 text-yellow-600" />
                    </div>
                    <CardTitle>Join Crop Advisory</CardTitle>
                    <p className="text-sm text-stone-500">Create your account</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        <Input
                            type="number"
                            placeholder="Pincode (for location)"
                            value={formData.pincode}
                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                            required
                        />
                        {error && <p className="text-sm text-red-500 break-words">{error}</p>}
                        <Button type="submit" variant="secondary" className="w-full">
                            Sign Up
                        </Button>
                        <p className="text-center text-sm text-stone-500">
                            Already have an account?{" "}
                            <Link to="/login" className="text-green-600 hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
