import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import './ListTask.css'; // Assuming the CSS file is in the same directory

const ListTasks = ({ tasks, setTasks }) => {
    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [completed, setCompleted] = useState([]);

    useEffect(() => {
        const fTodos = tasks.filter((task) => task.status === "todo");
        const fInProgress = tasks.filter((task) => task.status === "inprogress");
        const fCompleted = tasks.filter((task) => task.status === "completed");

        setTodos(fTodos);
        setInProgress(fInProgress);
        setCompleted(fCompleted);
    }, [tasks]);

    return (
        <div className="flex gap-16">
            <Section key="todo" status="todo" tasks={todos} setTasks={setTasks} className="todo-section" />
            <Section key="inprogress" status="inprogress" tasks={inProgress} setTasks={setTasks} className="inprogress-section" />
            <Section key="completed" status="completed" tasks={completed} setTasks={setTasks} className="completed-section" />
        </div>
    );
};

const Section = ({ status, tasks, setTasks, className }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "task",
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const addItemToSection = (id) => {
        setTasks((prevTasks) => {
            return prevTasks.map((task) =>
                task.id === id ? { ...task, status } : task
            );
        });
    };

    return (
        <div ref={drop} className={`w-64 ${isOver ? "bg-opacity-50" : ""} ${className}`}>
            <Header text={status} />
            <div className="task-list">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <Task key={task.id} task={task} setTasks={setTasks} />
                    ))
                ) : (
                    <p className="text-gray-500">No tasks</p>
                )}
            </div>
        </div>
    );
};

const Header = ({ text }) => {
    let bgColor = "";

    // Assign colors based on the column heading
    if (text === "todo") {
        bgColor = "bg-purple-500";
    } else if (text === "inprogress") {
        bgColor = "bg-yellow-500";
    } else if (text === "completed") {
        bgColor = "bg-green-500";
    }

    return (
        <div className={`${bgColor} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
            {text}
        </div>
    );
};


const Task = ({ task, setTasks }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const handleDelete = () => {
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setTasks((prevTasks) => {
            return prevTasks.map((t) =>
                t.id === task.id ? { ...t, status: newStatus } : t
            );
        });
    };
    return (
        <div
            ref={drag}
            className={`task-item bg-white p-4 mb-2 rounded-md ${isDragging ? "opacity-50" : ""} shadow-md`}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="font-bold">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className={`text-xs mt-2 ${getPriorityColor(task.priority)}`}>
                        Priority: {task.priority}
                    </p>
                </div>
                <div className="relative">
                    <select
                        value={task.status}
                        onChange={handleStatusChange}
                        className="status-dropdown"
                    >
                        <option value="todo">To Do</option>
                        <option value="inprogress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <svg
                        className="status-dropdown-symbol"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            <button onClick={handleDelete} className="bg-red-500 text-white rounded px-2 py-1 flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6 6L18 18M6 18L18 6" />
                </svg>
            </button>
        </div>
    );
    return (
        <div
            ref={drag}
            className={`task-item bg-white p-4 mb-2 rounded-md ${isDragging ? "opacity-50" : ""} shadow-md`}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="font-bold">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className={`text-xs mt-2 ${getPriorityColor(task.priority)}`}>
                        Priority: {task.priority}
                    </p>
                </div>
                <div className="flex items-center gap-0 relative">
                    <select
                        value={task.status}
                        onChange={handleStatusChange}
                        className="status-dropdown"
                    >
                        <option value="todo">To Do</option>
                        <option value="inprogress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <svg
                        className="status-dropdown-symbol"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <button
                        onClick={handleDelete}
                        className="delete-btn bg-red-500 text-white rounded px-2 py-1 flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M6 6L18 18M6 18L18 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};    
const getPriorityColor = (priority) => {
    switch (priority) {
        case "high":
            return "text-red-500";
        case "medium":
            return "text-yellow-500";
        case "low":
            return "text-green-500";
        default:
            return "";
    }
};

export default ListTasks;
