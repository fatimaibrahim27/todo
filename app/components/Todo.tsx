'use client';
import { useState } from 'react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState("");

    // Add a new todo
    const addTodo = () => {
        if (inputValue.trim() === "") return;
        setTodos([
            ...todos,
            { id: Date.now(), text: inputValue, completed: false },
        ]);
        setInputValue("");
    };

    // Toggle completion state
    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Delete a todo
    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <header className='bg-blue-600 text-white py-4'>
                <div className='max-w-4xl mx-auto text-center'>
                    <h1 className='text-3xl font-serif font-bold'>
                        My Daily TodoList
                    </h1>
                    <p className='font-serif mt-3'>
                        Organize your work with our todo list
                    </p>
                </div>
            </header>
            <main className='flex-grow flex items-center justify-center'>
                <div className='max-w-md mx-auto p-4 bg-slate-600 rounded-lg shadow-md'>
                    <div className='mb-4'>
                        <div className='flex'>
                            <input
                                type='text'
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className='flex-grow p-2 border border-gray-400 rounded-lg'
                                placeholder='Add todays task...'
                            />
                            <button
                                onClick={addTodo}
                                className='ml-2 py-2 px-4 bg-blue-400 text-white rounded-lg hover:bg-sky-400'
                            >
                                Add Task
                            </button>
                        </div>
                    </div>
                    <ul className='space-y-2'>
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className={`flex items-center justify-between p-2 border border-slate-700 rounded-lg ${
                                    todo.completed
                                        ? "bg-lime-300 line-through"
                                        : "bg-sky-300"
                                }`}
                            >
                                <span>{todo.text}</span>
                                <div>
                                    <button
                                        onClick={() => toggleTodo(todo.id)}
                                        className='text-white px-2 py-1 text-sm bg-green-500 rounded-lg hover:bg-gray-300 hover:text-black'
                                    >
                                        {todo.completed ? "Undo" : "Complete"}
                                    </button>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className='ml-2 text-white px-2 py-1 text-sm bg-red-500 rounded-lg hover:bg-gray-300 hover:text-black'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default TodoList;
