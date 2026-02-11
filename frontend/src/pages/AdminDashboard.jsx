import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalStudents: 0,
    totalAttempts: 0,
    averageScore: 0
  });

  const [recentQuizzes, setRecentQuizzes] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    setStats({
      totalQuizzes: 25,
      totalStudents: 150,
      totalAttempts: 450,
      averageScore: 76
    });

    setRecentQuizzes([
      {
        id: 1,
        title: 'JavaScript Fundamentals',
        attempts: 45,
        avgScore: 78,
        createdAt: '2024-02-01'
      },
      {
        id: 2,
        title: 'React Advanced Concepts',
        attempts: 32,
        avgScore: 72,
        createdAt: '2024-02-05'
      },
      {
        id: 3,
        title: 'Data Structures',
        attempts: 28,
        avgScore: 81,
        createdAt: '2024-02-08'
      }
    ]);
  }, []);

  return (
    <div className="min-h-screen geometric-bg px-6 py-12">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Manage quizzes and monitor student performance
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: '📝',
              label: 'Total Quizzes',
              value: stats.totalQuizzes,
              color: 'from-primary-500 to-primary-400'
            },
            {
              icon: '👥',
              label: 'Total Students',
              value: stats.totalStudents,
              color: 'from-accent-cyan to-blue-400'
            },
            {
              icon: '🎯',
              label: 'Quiz Attempts',
              value: stats.totalAttempts,
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: '📊',
              label: 'Average Score',
              value: `${stats.averageScore}%`,
              color: 'from-green-500 to-emerald-400'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{stat.icon}</div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-20`} />
              </div>
              <div className="font-display text-4xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Quizzes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold gradient-text">
                Recent Quizzes
              </h2>
              <Link to="/admin/create" className="btn-primary text-sm">
                Create New
              </Link>
            </div>

            <div className="space-y-4">
              {recentQuizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-dark-bg rounded-xl p-4 hover:border hover:border-primary-500/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{quiz.title}</h3>
                    <span className="text-xs text-gray-500">{quiz.createdAt}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400">
                        🎯 {quiz.attempts} attempts
                      </span>
                      <span className={`font-semibold ${
                        quiz.avgScore >= 70 ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        📊 {quiz.avgScore}% avg
                      </span>
                    </div>
                    <Link to={`/admin/quiz/${quiz.id}`} className="text-accent-cyan hover:underline">
                      View Details →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-8"
          >
            <h2 className="font-display text-2xl font-bold mb-6 gradient-text">
              Quick Actions
            </h2>

            <div className="space-y-4">
              <Link to="/admin/create">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-500 p-6 rounded-xl text-left hover:shadow-xl transition-all"
                >
                  <div className="text-3xl mb-2">➕</div>
                  <div className="font-display text-xl font-bold mb-1">
                    Create New Quiz
                  </div>
                  <div className="text-sm text-gray-300">
                    Add questions and publish to students
                  </div>
                </motion.button>
              </Link>

              <Link to="/admin/students">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-dark-bg border-2 border-dark-border p-6 rounded-xl text-left hover:border-primary-500/50 transition-all"
                >
                  <div className="text-3xl mb-2">👥</div>
                  <div className="font-display text-xl font-bold mb-1">
                    Manage Students
                  </div>
                  <div className="text-sm text-gray-400">
                    View student profiles and performance
                  </div>
                </motion.button>
              </Link>

              <Link to="/admin/analytics">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-dark-bg border-2 border-dark-border p-6 rounded-xl text-left hover:border-primary-500/50 transition-all"
                >
                  <div className="text-3xl mb-2">📈</div>
                  <div className="font-display text-xl font-bold mb-1">
                    View Analytics
                  </div>
                  <div className="text-sm text-gray-400">
                    Detailed insights and reports
                  </div>
                </motion.button>
              </Link>

              <Link to="/admin/settings">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-dark-bg border-2 border-dark-border p-6 rounded-xl text-left hover:border-primary-500/50 transition-all"
                >
                  <div className="text-3xl mb-2">⚙️</div>
                  <div className="font-display text-xl font-bold mb-1">
                    Settings
                  </div>
                  <div className="text-sm text-gray-400">
                    Configure quiz settings and preferences
                  </div>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
