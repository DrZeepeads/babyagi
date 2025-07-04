import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto px-4 py-3 flex gap-4">
          <Link className="hover:text-gray-300" to="/dashboard">Dashboard</Link>
          <Link className="hover:text-gray-300" to="/functions">Functions</Link>
          <Link className="hover:text-gray-300" to="/keys">Keys</Link>
          <Link className="hover:text-gray-300" to="/graph">Graph</Link>
        </nav>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-center py-2 text-sm text-gray-500">
        © {new Date().getFullYear()} Autonomous Agent
      </footer>
    </div>
  );
}

export default Layout;