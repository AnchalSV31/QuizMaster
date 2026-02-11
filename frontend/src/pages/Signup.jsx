import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from "../services/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await authService.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      alert('Account created successfully! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center geometric-bg px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card p-8 md:p-12 w-full max-w-md relative z-10"
      >
        <h1 className="font-display text-4xl font-bold mb-2 gradient-text text-center">
          Create Account
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Join QuizMaster and start learning
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-semibold mb-3">Select Role</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'STUDENT' })}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  formData.role === 'STUDENT'
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-dark-border hover:border-primary-500/50'
                }`}
              >
                <div className="text-3xl mb-2">🎓</div>
                <div className="font-semibold">Student</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'ADMIN' })}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  formData.role === 'ADMIN'
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-dark-border hover:border-primary-500/50'
                }`}
              >
                <div className="text-3xl mb-2">👨‍💼</div>
                <div className="font-semibold">Admin</div>
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="input-field"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="input-field"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input-field"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="input-field"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-accent-cyan hover:underline font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
