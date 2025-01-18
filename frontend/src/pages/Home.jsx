

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, List, Clock, Bell, ChevronRight, Star, Menu, X } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: <CheckCircle className="w-6 h-6 text-blue-500" />,
            title: "Smart Task Management",
            description: "Organize tasks with our AI-powered system that learns your preferences and priorities."
        },
        {
            icon: <List className="w-6 h-6 text-blue-500" />,
            title: "Dynamic Lists",
            description: "Create unlimited custom lists with tags, filters, and advanced sorting options."
        },
        {
            icon: <Clock className="w-6 h-6 text-blue-500" />,
            title: "Intelligent Reminders",
            description: "Set context-aware reminders that notify you at the most appropriate times."
        },
        {
            icon: <Bell className="w-6 h-6 text-blue-500" />,
            title: "Priority Focus",
            description: "Stay focused on high-priority tasks with our innovative scoring system."
        }
    ];

    const stats = [
        { number: "10K+", label: "Active Users" },
        { number: "1M+", label: "Tasks Completed" },
        { number: "99%", label: "Satisfaction Rate" },
        { number: "24/7", label: "Support" }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Navbar */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
            }`}>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer flex items-center gap-2 hover:scale-105 transition-transform" 
                             onClick={() => navigate('/')}>
                            <List className="w-6 h-6" />
                            TaskMaster
                        </h1>

                        {/* Mobile menu button */}
                        <button 
                            className="md:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:-translate-y-0.5 transition duration-300"
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transform hover:-translate-y-0.5 transition duration-300"
                            >
                                Login
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className={`md:hidden transition-all duration-300 ${
                        isMobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                        <div className="py-4 space-y-2">
                            <button
                                onClick={() => navigate('/signup')}
                                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="container mx-auto text-center max-w-4xl">
                    <div className="inline-block px-4 py-1 bg-blue-100 rounded-full text-blue-600 font-medium mb-6 animate-bounce">
                        ✨ Revolutionize Your Task Management
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Organize Your Life,{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                            Master Your Day
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Transform your productivity with our intelligent todo list application.
                        Join thousands of users who have mastered their daily routines.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-8 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transform hover:-translate-y-1 transition duration-300 flex items-center justify-center gap-2 group"
                        >
                            Get Started Free
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => navigate('/demo')}
                            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg text-lg font-semibold hover:border-blue-500 hover:text-blue-500 transform hover:-translate-y-1 transition duration-300"
                        >
                            Watch Demo
                        </button>
                    </div>
                    
                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        {stats.map((stat, index) => (
                            <div key={index} 
                                 className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1">
                                <div className="text-2xl font-bold text-blue-600">{stat.number}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto">
                    <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">
                        Features that Make the Difference
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 transform hover:-translate-y-2 cursor-pointer"
                                onMouseEnter={() => setActiveFeature(index)}
                            >
                                <div className={`w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 ${
                                    activeFeature === index ? 'scale-110' : ''
                                }`}>
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h4>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <div className="container mx-auto text-center max-w-3xl">
                    <Star className="w-12 h-12 mx-auto mb-6 animate-spin-slow" />
                    <h3 className="text-4xl font-bold mb-6">
                        Ready to Transform Your Productivity?
                    </h3>
                    <p className="text-lg mb-8 text-blue-100">
                        Join thousands of users who have revolutionized their task management experience.
                        Start your journey today with our free plan.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transform hover:-translate-y-1 transition duration-300"
                        >
                            Create Free Account
                        </button>
                        <button
                            onClick={() => navigate('/features')}
                            className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-blue-600/20 transform hover:-translate-y-1 transition duration-300"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <List className="w-6 h-6" />
                                TaskMaster
                            </h4>
                            <p className="text-gray-400">
                                Simplifying task management for individuals and teams worldwide.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition duration-300">Features</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Integration</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-white transition duration-300">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Guides</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Support</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-4">Contact</h4>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <span>📧</span>
                                    <a href="mailto:support@taskmaster.com" className="hover:text-white transition duration-300">
                                        support@taskmaster.com
                                    </a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span>📱</span>
                                    <span>(555) 123-4567</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                        <p>&copy; 2025 Naveenkumar ks. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;