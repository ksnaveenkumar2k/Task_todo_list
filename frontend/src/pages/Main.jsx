import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Calendar, ClipboardList, CheckCircle2, Loader2, AlertCircle, FileText, Clock } from 'lucide-react';
import API from '../api/axios';

const Main = () => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodos = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await API.get('/api/todos/');
                setTodos(response.data);
            } catch (error) {
                setError('Error fetching tasks. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, []);

    const handleTaskChange = (e) => setTask(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const handleAddTask = async () => {
        if (task && description) {
            const newTask = {
                task: task,
                description: description,
                date: new Date().toLocaleString(),
            };

            try {
                setLoading(true);
                await API.post('/api/todos/add/', newTask);
                setTodos((prevTodos) => [...prevTodos, newTask]);
                setTask('');
                setDescription('');
                
                const successMessage = document.getElementById('success-message');
                successMessage.classList.remove('opacity-0');
                setTimeout(() => {
                    successMessage.classList.add('opacity-0');
                }, 3000);

                navigate('/taskspage');
            } catch (error) {
                setError('Error adding task. Please try again later.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
            {/* Success Message */}
            <div
                id="success-message"
                className="fixed top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg opacity-0 transition-opacity duration-500 flex items-center gap-2"
            >
                <CheckCircle2 className="w-5 h-5" />
                Task added successfully!
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <h2 className="text-3xl font-bold flex items-center gap-3">
                                <ClipboardList className="w-8 h-8" />
                                Task Master
                            </h2>
                            <div className="text-sm bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                {new Date().toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-8">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <p className="text-red-700">{error}</p>
                            </div>
                        )}

                        {/* Add Task Form */}
                        <div className="space-y-4 mb-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={task}
                                    onChange={handleTaskChange}
                                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300"
                                    placeholder="What needs to be done?"
                                />
                                <CheckCircle2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>

                            <div className="relative">
                                <textarea
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-300 min-h-[120px]"
                                    placeholder="Add details about your task..."
                                />
                                <FileText className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                            </div>

                            <button
                                onClick={handleAddTask}
                                disabled={loading || !task || !description}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 font-medium"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Adding Task...
                                    </>
                                ) : (
                                    <>
                                        <PlusCircle className="w-5 h-5" />
                                        Add Task
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Tasks List */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Your Tasks
                            </h3>

                            {loading && !todos.length ? (
                                <div className="text-center py-12">
                                    <Loader2 className="w-10 h-10 animate-spin mx-auto text-indigo-500 mb-4" />
                                    <p className="text-gray-500">Loading your tasks...</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {todos.length > 0 ? (
                                        todos.map((todo, index) => (
                                            <div
                                                key={index}
                                                className="group bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-100"
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <h4 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">{todo.task}</h4>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <Clock className="w-4 h-4" />
                                                        {todo.date}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600">{todo.description}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                            <ClipboardList className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                            <p className="text-gray-600">No tasks available. Add your first task above!</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;