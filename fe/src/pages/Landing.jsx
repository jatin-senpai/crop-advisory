import React from "react";
import { Link } from "react-router-dom";
import {
    Leaf,
    CloudSun,
    TrendingUp,
    MessageSquare,
    ArrowRight,
    ShieldCheck,
    Zap
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

export default function Landing() {
    const features = [
        {
            icon: <Leaf className="h-8 w-8 text-green-500" />,
            title: "AI Crop Recommendation",
            description: "Get personalized crop suggestions based on your soil and local climate conditions."
        },
        {
            icon: <CloudSun className="h-8 w-8 text-blue-500" />,
            title: "Weather Insights",
            description: "Real-time weather updates and alerts to help you plan your farming activities better."
        },
        {
            icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
            title: "Mandi Prices",
            description: "Stay updated with the latest market rates from nearby mandis to get the best price for your produce."
        },
        {
            icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
            title: "AI Chatbot Support",
            description: "Instant answers to your farming queries from our intelligent AI assistant."
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-stone-900">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 w-full border-b border-stone-100 bg-white/80 backdrop-blur-md">
                <div className="container mx-auto flex h-20 items-center justify-between px-6">
                    <div className="flex items-center gap-2 text-2xl font-bold text-green-700">
                        <Leaf className="h-8 w-8" />
                        <span>Kisan Sahayak</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 font-medium">
                        <a href="#features" className="hover:text-green-600 transition-colors">Features</a>
                        <a href="/about" className="hover:text-green-600 transition-colors">About</a>
                        <Link to="/login">
                            <Button variant="ghost" className="text-stone-600 hover:text-green-700">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="bg-green-700 hover:bg-green-800 text-white px-6">Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-green-50/50 rounded-l-full blur-3xl opacity-50 translate-x-1/2" />
                <div className="container mx-auto px-6 text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            <ShieldCheck className="h-4 w-4" />
                            Trusted by 10,000+ Farmers
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                            Empowering <span className="text-green-700">Farmers</span> with Smart Advice
                        </h1>
                        <p className="text-xl text-stone-600 max-w-xl leading-relaxed">
                            Kisan Sahayak uses advanced AI to provide real-time agricultural insights, weather alerts, and market prices to help you farm smarter and earn more.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link to="/signup">
                                <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white rounded-xl px-10 py-7 text-lg h-auto flex items-center gap-2 shadow-xl shadow-green-200">
                                    Get Started for Free <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="outline" size="lg" className="border-stone-200 hover:bg-stone-50 rounded-xl px-10 py-7 text-lg h-auto">
                                    View Demo
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative group animate-in fade-in scale-in-95 duration-1000">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-green-200 to-yellow-100 rounded-[2rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
                        <div className="relative bg-white border border-stone-200 rounded-[2rem] p-4 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=1200"
                                alt="Farmer using technology"
                                className="rounded-2xl w-full h-[400px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-24 bg-stone-50/50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                        <h2 className="text-4xl font-bold tracking-tight">Everything you need to succeed</h2>
                        <p className="text-lg text-stone-600 leading-relaxed">
                            We combine cutting-edge technology with traditional farming wisdom to provide the best possible support for your fields.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <Card key={idx} className="border-none shadow-xl shadow-stone-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white">
                                <CardContent className="p-8 space-y-4">
                                    <div className="w-14 h-14 bg-white shadow-lg rounded-2xl flex items-center justify-center mb-6">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold">{feature.title}</h3>
                                    <p className="text-stone-500 leading-relaxed">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="bg-green-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-3xl">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-800/50 to-transparent -z-10" />
                        <Zap className="h-16 w-16 text-yellow-500 mx-auto mb-8 animate-pulse" />
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to grow your harvest?</h2>
                        <p className="text-xl text-green-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of farmers who are already using Kisan Sahayak to make better decisions every day.
                        </p>
                        <Link to="/signup">
                            <Button size="lg" className="bg-white text-green-900 hover:bg-stone-100 rounded-xl px-12 py-8 text-xl h-auto font-bold shadow-2xl">
                                Create Account Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-stone-100">
                <div className="container mx-auto px-6 text-center text-stone-400">
                    <p>© 2025 Kisan Sahayak. Made with ❤️ for Indian Farmers.</p>
                </div>
            </footer>
        </div>
    );
}
