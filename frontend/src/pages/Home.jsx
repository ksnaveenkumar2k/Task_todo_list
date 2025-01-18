import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Navbar */}
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
                        ToDo List
                    </h1>
                    <div className="space-x-4">
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Signup
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Login
                        </button>
                        <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                            Contact
                        </button>
                    </div>
                </div>
            </nav>

            {/* Product Details Section */}
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Example Product Cards */}
                    <div className="bg-white p-4 shadow-lg rounded-lg hover:shadow-xl transition">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Product 1"
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">Product 1</h3>
                        <p className="text-gray-600 mt-2">Description of product 1.</p>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                            View More
                        </button>
                    </div>
                    {/* Add more product cards as needed */}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2025 ToDo List. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
