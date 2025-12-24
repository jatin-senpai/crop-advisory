import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Users, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function About() {
    const team = [
        { name: "Jatin", role: "Lead Developer", quote: "Innovating for farmers." },
        { name: "Monish", role: "Frontend Architect", quote: "Designing with empathy." },
        { name: "Hemant", role: "Backend Specialist", quote: "Powering the platform." }
    ];

    return (
        <div className="min-h-screen bg-stone-50 font-sans">
            {/* Header for navigation back */}
            <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center px-4">
                    <Link to="/" className="flex items-center text-stone-600 hover:text-green-700 transition-colors">
                        <ArrowLeft className="h-5 w-5 mr-2" /> Back to Home
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <section className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
                        <Leaf className="h-8 w-8 text-green-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
                        About <span className="text-green-700">Kisan Sahayak</span>
                    </h1>
                    <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
                        We are a passionate team of students dedicated to empowering India's farmers with technology. Our mission is to provide accurate, timely, and actionable advice to maximize crop yields and profits.
                    </p>
                </section>

                {/* Team Section */}
                <section className="mb-16">
                    <div className="flex items-center gap-2 mb-8 justify-center">
                        <Users className="h-6 w-6 text-stone-400" />
                        <h2 className="text-2xl font-bold text-stone-800">Meet the Team</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {team.map((member, idx) => (
                            <Card key={idx} className="text-center hover:shadow-lg transition-all duration-300 border-none bg-white shadow-md">
                                <CardContent className="pt-8 pb-8">
                                    <div className="w-20 h-20 bg-stone-100 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-stone-400">
                                        {member.name[0]}
                                    </div>
                                    <h3 className="text-xl font-bold text-stone-900">{member.name}</h3>
                                    <p className="text-green-600 font-medium text-sm mb-4">{member.role}</p>
                                    <p className="text-stone-500 text-sm italic">"{member.quote}"</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section className="text-center bg-stone-900 text-stone-50 rounded-2xl p-8 md:p-12 shadow-xl">
                    <Mail className="h-10 w-10 mx-auto text-yellow-500 mb-4" />
                    <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-stone-300 mb-8 max-w-lg mx-auto">
                        Have questions, suggestions, or just want to say hi? We'd love to hear from you. Drop us an email!
                    </p>
                    <a href="mailto:yshake1004@gmail.com">
                        <Button size="lg" className="bg-yellow-500 text-stone-900 hover:bg-yellow-400 font-bold px-8">
                            Send us an Email
                        </Button>
                    </a>
                </section>

                <footer className="mt-16 text-center text-stone-400 text-sm">
                    <p>© 2025 Kisan Sahayak. Made with ❤️ in India.</p>
                </footer>
            </main>
        </div>
    );
}
