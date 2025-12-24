import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import api from "../lib/api";
import { Leaf } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/signin", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-stone-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <Link to="/" className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 hover:bg-green-100 transition-colors border border-green-100">
                        <Leaf className="h-6 w-6 text-green-700" />
                    </Link>
                    <CardTitle>Welcome Back</CardTitle>
                    <p className="text-sm text-stone-500">Sign in to your account</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white">
                            Sign In
                        </Button>
                        <p className="text-center text-sm text-stone-500">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-green-600 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
