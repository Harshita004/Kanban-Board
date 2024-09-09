import React, { useState, useEffect } from 'react';
import CreateTaskForm from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        try {
            const savedTasks = JSON.parse(localStorage.getItem("tasks"));
            if (savedTasks) {
                setTasks(savedTasks);
            }
        } catch (error) {
            console.error("Error fetching tasks from localStorage:", error);
        }
    }, []);

    useEffect(() => {
        try {
            if (tasks.length > 0) {
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        } catch (error) {
            console.error("Error saving tasks to localStorage:", error);
        }
    }, [tasks]);

    return (
        <DndProvider backend={HTML5Backend}>
            <Toaster />
            <div className="bg-slate-100 w-screen h-screen flex flex-col items-center pt-3 gap-16">
                <div className="flex items-center gap-7">
                    {/* Heading and Create Task Button */}
                    <h1 className="text-2xl font-bold text-gray-700">
                       <b> Kanban Board</b>  
                    </h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-purple-500 text-white px-4 py-2 rounded-md"
                    >
                        Create Task
                    </button>
                </div>
                {showForm && <CreateTaskForm tasks={tasks} setTasks={setTasks} setShowForm={setShowForm} />}

                <ListTasks tasks={tasks} setTasks={setTasks} />
            </div>
            

        </DndProvider>
    );
}

export default App;
