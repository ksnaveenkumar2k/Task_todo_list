import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './pages/Home'; // Import Home component
import Main from './pages/Main';
import TasksPage from './pages/TasksPage';  // Import TaskPage component

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Home page */}
                <Route path="/signup" element={<SignUp />} /> {/* Signup page */}
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* Login page */}
                <Route path="/main" element={isLoggedIn ? <Main /> : <Login setIsLoggedIn={setIsLoggedIn} />} /> {/* Main page (redirect if not logged in) */}
                <Route path="/taskspage" element={<TasksPage />} />  {/* New Route for TaskPage */}
            </Routes>
        </Router>
    );
}

export default App;
