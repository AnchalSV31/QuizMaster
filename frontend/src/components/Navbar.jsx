import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-dark-card/80 backdrop-blur-lg border-b border-dark-border sticky top-0 z-50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-primary-500 rounded-lg flex items-center justify-center">
              <span className="font-display text-2xl font-bold">Q</span>
            </div>
            <span className="font-display text-2xl font-bold gradient-text">
              QuizMaster
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="nav-link">
              Home
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/quizzes" className="nav-link">
                  Quizzes
                </Link>
                {user?.role === 'admin' && (
                  <>
                    <Link to="/admin" className="nav-link">
                      Dashboard
                    </Link>
                    <Link to="/admin/create" className="nav-link">
                      Create Quiz
                    </Link>
                  </>
                )}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-cyan to-primary-500 flex items-center justify-center">
                      <span className="text-sm font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm">
                      {user?.name}
                      <span className="ml-2 text-xs text-accent-cyan">
                        ({user?.role})
                      </span>
                    </span>
                  </div>
                  <button onClick={handleLogout} className="btn-secondary text-sm">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
