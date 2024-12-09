import React from 'react';
import { X, Plus, Check, Square } from 'lucide-react';
import { useTodoStore } from '../../store/todoStore';

interface TodoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TodoPanel({ isOpen, onClose }: TodoPanelProps) {
  const [newTodo, setNewTodo] = React.useState('');
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity lg:bg-opacity-0"
          onClick={onClose}
        />
      )}

      {/* Side Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Tasks</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-4 py-6 overflow-y-auto">
            {/* Add Todo Form */}
            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a task..."
                className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                <Plus className="h-5 w-5" />
              </button>
            </form>

            {/* Todo List */}
            <div className="space-y-2">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="flex items-center gap-2 flex-1 text-left"
                  >
                    {todo.completed ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400" />
                    )}
                    <span
                      className={`${
                        todo.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {todo.text}
                    </span>
                  </button>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}