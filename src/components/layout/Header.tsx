import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mic, BookMarked, ListTodo } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { TodoPanel } from '../sidebar/TodoPanel';

export function Header() {
  const location = useLocation();
  const isNotesPage = location.pathname === '/notes';
  const [isTodoPanelOpen, setIsTodoPanelOpen] = useState(false);

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Mic className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">VoiceNotes</h1>
            </Link>
            <nav className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setIsTodoPanelOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <ListTodo className="h-4 w-4 mr-2" />
                Tasks
              </button>
              <Link
                to={isNotesPage ? '/' : '/notes'}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                <BookMarked className="h-4 w-4 mr-2" />
                {isNotesPage ? 'New Recording' : 'My Notes'}
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <TodoPanel isOpen={isTodoPanelOpen} onClose={() => setIsTodoPanelOpen(false)} />
    </>
  );
}