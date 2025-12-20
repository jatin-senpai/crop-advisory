import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import api from '../lib/api';

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Namaste! I am Kisan Sahayak AI. Ask me anything about your crops.", isUser: false }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await api.post('/gemini', { message: userMessage });
            const botMessage = res.data.reply;
            setMessages(prev => [...prev, { text: botMessage, isUser: false }]);
        } catch (error) {
            setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now. Please try again.", isUser: false }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-600 text-white shadow-xl hover:bg-green-700 flex items-center justify-center transition-transform hover:scale-105 z-50 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <MessageCircle className="h-7 w-7" />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-full max-w-sm bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-stone-200 animate-in slide-in-from-bottom-10 fade-in duration-300">

                    {/* Header */}
                    <div className="bg-green-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Bot className="h-5 w-5" />
                            </div>
                            <h3 className="font-bold">Kisan Assistant</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full text-white/90">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="h-96 overflow-y-auto p-4 space-y-4 bg-stone-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.isUser
                                        ? 'bg-green-600 text-white rounded-br-none'
                                        : 'bg-white border border-stone-200 text-stone-800 rounded-bl-none shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-stone-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                                    <div className="h-2 w-2 bg-stone-400 rounded-full animate-bounce"></div>
                                    <div className="h-2 w-2 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="h-2 w-2 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-stone-100 flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about fertilizer, pests..."
                            className="flex-1 focus-visible:ring-green-500"
                            disabled={isLoading}
                        />
                        <Button type="submit" size="icon" className="shrink-0 bg-green-600 hover:bg-green-700" disabled={isLoading || !input.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            )}
        </>
    );
}
