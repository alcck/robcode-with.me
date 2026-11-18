import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo & Brand */}
      <div className="flex items-center space-x-3">
        <span className="h-4 w-4 rounded-lg bg-emerald-500 inline-block shadow-lg shadow-emerald-500/50"></span>
        <Link to="/" className="text-xl font-extrabold text-white tracking-wide">
          CodeCraft <span className="text-emerald-400">Academy</span>
        </Link>
      </div>

      {/* User Profile / Auth Action */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700">
              <span className="text-sm font-medium text-gray-200">{user.name}</span>
              <span className="text-xs uppercase bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-semibold border border-emerald-800">
                {user.role}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-md shadow-emerald-600/20"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;