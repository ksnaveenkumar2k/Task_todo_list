import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './pages/Home'; // Import Home component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Home page */}
                <Route path="/signup" element={<SignUp />} /> {/* Signup page */}
                <Route path="/login" element={<Login />} /> {/* Login page */}
            </Routes>
        </Router>
    );
}

export default App;
