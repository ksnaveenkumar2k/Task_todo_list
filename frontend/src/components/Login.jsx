import React, { useState } from 'react';
import API from '../api/axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('/login/', formData);
            console.log('Login successful:', response.data);
            alert('Login successful!');
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login failed!');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form 
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
