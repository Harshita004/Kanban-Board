import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateTaskForm = ({ tasks, setTasks, setShowForm }) => {
    const [task, setTask] = useState({
        id: '',
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        dueDate: null, // To store selected date
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (task.title.length < 2) {
            return toast.error("Task title is too short!");
        }
        if (task.title.length > 1000) {
            return toast.error("Task title is too long!");
        }
        if (!task.dueDate) {
            return toast.error("Please select a due date!");
        }

        const newTask = { ...task, id: uuidv4() };
        const updatedTasks = [...tasks, newTask];

        // Save to state and localStorage
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        // Reset the form
        setTask({
            id: '',
            title: '',
            description: '',
            status: 'todo',
            priority: 'medium',
            dueDate: null,
        });

        toast.success('Task created successfully!');
        setShowForm(false); // Close the form after submission
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md w-96">
                <h2 className="text-lg font-semibold mb-4">Create New Task</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="border-2 border-gray-300 rounded-md w-full px-2 py-1"
                            value={task.title}
                            onChange={(e) => setTask({ ...task, title: e.target.value })}
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            className="border-2 border-gray-300 rounded-md w-full px-2 py-1"
                            value={task.description}
                            onChange={(e) => setTask({ ...task, description: e.target.value })}
                        />
                    </div>

                    {/* Due Date Input */}
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                        <DatePicker
                            selected={task.dueDate}
                            onChange={(date) => setTask({ ...task, dueDate: date })}
                            className="border-2 border-gray-300 rounded-md w-full px-2 py-1"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    {/* Status Input */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            id="status"
                            className="border-2 border-gray-300 rounded-md w-full px-2 py-1"
                            value={task.status}
                            onChange={(e) => setTask({ ...task, status: e.target.value })}
                        >
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Priority Input */}
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                        <select
                            id="priority"
                            className="border-2 border-gray-300 rounded-md w-full px-2 py-1"
                            value={task.priority}
                            onChange={(e) => setTask({ ...task, priority: e.target.value })}
                        >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                            onClick={() => setShowForm(false)} // Close the form
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-purple-500 text-white px-4 py-2 rounded-md"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskForm;
