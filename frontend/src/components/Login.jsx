// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
// import API from '../api/axios';

// const Login = ({ setIsLoggedIn }) => {  // Accept setIsLoggedIn as a prop
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });
//     const navigate = useNavigate();  // Hook to navigate to another page

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await API.post('/login/', formData);
//             console.log('Login successful:', response.data);
//             alert('Login successful!');
            
//             setIsLoggedIn(true); // Set login status to true
//             navigate('/main');  // Redirect to main page
//         } catch (error) {
//             console.error('Error during login:', error);
//             alert('Login failed!');
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <form 
//                 className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
//                 onSubmit={handleSubmit}
//             >
//                 <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="block w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     required
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="block w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     required
//                 />
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Eye, EyeOff, LogIn } from 'lucide-react';
import API from '../api/axios';

const Login = ({ setIsLoggedIn }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.includes('@')) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await API.post('/login/', formData);
            console.log('Login successful:', response.data);
            
            // Show success message
            const successMessage = document.getElementById('success-message');
            successMessage.classList.remove('opacity-0');
            
            setIsLoggedIn(true);
            
            // Redirect after short delay
            setTimeout(() => {
                navigate('/main');
            }, 1000);
        } catch (error) {
            console.error('Error during login:', error);
            setErrors({ submit: 'Invalid email or password' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-4">
            {/* Back button */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-4 left-4 text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </button>

            {/* Success Message */}
            <div
                id="success-message"
                className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg opacity-0 transition-opacity duration-500"
            >
                Login successful! Redirecting...
            </div>

            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    <div className="text-center">
                        <div className="inline-flex justify-center items-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                            <LogIn className="w-8 h-8 text-blue-500" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-gray-600">Please enter your details to sign in</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 ${
                                        errors.email ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm ml-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 ${
                                        errors.password ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm ml-1">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                                <span className="text-gray-600">Remember me</span>
                            </label>
                            <button
                                type="button"
                                className="text-blue-500 hover:text-blue-600 transition-colors"
                                onClick={() => navigate('/forgot-password')}
                            >
                                Forgot password?
                            </button>
                        </div>

                        {errors.submit && (
                            <p className="text-red-500 text-center">{errors.submit}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>

                    <div className="text-center text-gray-600">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/signup')}
                            className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;