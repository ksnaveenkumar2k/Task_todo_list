

import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  Search,
  LayoutGrid,
  LayoutList,
  Clock,
  Star
} from 'lucide-react';

const TaskPage = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState('grid');

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await API.get('/api/todos/');
                setTodos(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTodos();
    }, []);

    const filteredTodos = todos.filter(todo =>
        todo.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                            <h1 className="text-3xl font-bold tracking-tight mb-1">
                                Task Dashboard
                            </h1>
                            <p className="text-indigo-100">
                                Streamline your productivity
                            </p>
                        </div>
                        <Link 
                            to="/Main" 
                            className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-indigo-600 font-medium shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            <PlusCircle className="w-5 h-5 mr-2" />
                            New Task
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Controls Section */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
                    <div className="sm:flex sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                        
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setView('grid')}
                                className={`p-2 rounded-lg ${view === 'grid' 
                                    ? 'bg-indigo-100 text-indigo-600' 
                                    : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <LayoutGrid className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setView('list')}
                                className={`p-2 rounded-lg ${view === 'list' 
                                    ? 'bg-indigo-100 text-indigo-600' 
                                    : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <LayoutList className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : filteredTodos.length > 0 ? (
                    <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                        {filteredTodos.map((todo, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center mb-2">
                                                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                    {todo.task}
                                                </h3>
                                            </div>
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {todo.description}
                                            </p>
                                        </div>
                                        <span className="ml-4 flex-shrink-0">
                                            <CheckCircle className="w-6 h-6 text-emerald-500" />
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {todo.date}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Clock className="w-4 h-4 mr-1" />
                                                Priority
                                            </div>
                                        </div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                        <div className="mx-auto w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                            <AlertCircle className="w-12 h-12 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No tasks found</h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm ? "No tasks match your search criteria" : "Your task list is empty"}
                        </p>
                        <Link 
                            to="/Main" 
                            className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-200"
                        >
                            <PlusCircle className="w-5 h-5 mr-2" />
                            Create your first task
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskPage;
