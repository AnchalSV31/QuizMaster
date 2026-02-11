import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ViewAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week'); // week, month, year
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // Mock analytics data
    const mockAnalytics = {
      overview: {
        totalQuizzes: 25,
        totalAttempts: 450,
        totalStudents: 150,
        averageScore: 76,
        passRate: 68,
        activeUsers: 120
      },
      quizPerformance: [
        { name: 'JavaScript Fundamentals', attempts: 45, avgScore: 78, passRate: 72 },
        { name: 'React Advanced', attempts: 32, avgScore: 72, passRate: 65 },
        { name: 'Data Structures', attempts: 38, avgScore: 81, passRate: 75 },
        { name: 'Web Development', attempts: 42, avgScore: 85, passRate: 82 },
        { name: 'Database Management', attempts: 28, avgScore: 69, passRate: 58 }
      ],
      categoryBreakdown: [
        { category: 'Programming', quizzes: 10, attempts: 180, avgScore: 77 },
        { category: 'Web Development', quizzes: 8, attempts: 145, avgScore: 82 },
        { category: 'Database', quizzes: 4, attempts: 85, avgScore: 71 },
        { category: 'Computer Science', quizzes: 3, attempts: 40, avgScore: 79 }
      ],
      recentActivity: [
        { student: 'Alice Johnson', quiz: 'JavaScript Fundamentals', score: 85, date: '2024-02-11' },
        { student: 'Bob Smith', quiz: 'React Advanced', score: 72, date: '2024-02-11' },
        { student: 'Carol Williams', quiz: 'Data Structures', score: 92, date: '2024-02-10' },
        { student: 'Emma Davis', quiz: 'Web Development', score: 88, date: '2024-02-10' },
        { student: 'Frank Miller', quiz: 'Database Management', score: 65, date: '2024-02-09' }
      ],
      weeklyTrend: [
        { day: 'Mon', attempts: 45, avgScore: 75 },
        { day: 'Tue', attempts: 52, avgScore: 78 },
        { day: 'Wed', attempts: 48, avgScore: 76 },
        { day: 'Thu', attempts: 61, avgScore: 79 },
        { day: 'Fri', attempts: 55, avgScore: 77 },
        { day: 'Sat', attempts: 38, avgScore: 74 },
        { day: 'Sun', attempts: 42, avgScore: 73 }
      ]
    };
    setAnalytics(mockAnalytics);
  }, [timeRange]);

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl gradient-text font-display">Loading Analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen geometric-bg px-6 py-12">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-5xl font-bold mb-4 gradient-text">
                Analytics Dashboard
              </h1>
              <p className="text-gray-400 text-lg">
                Comprehensive insights into quiz performance and student engagement
              </p>
            </div>
            <div className="flex gap-2">
              {['week', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all ${
                    timeRange === range
                      ? 'bg-primary-500'
                      : 'bg-dark-bg border-2 border-dark-border hover:border-primary-500/50'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Quizzes', value: analytics.overview.totalQuizzes, icon: '📝', color: 'from-primary-500 to-primary-400', change: '+5%' },
            { label: 'Total Attempts', value: analytics.overview.totalAttempts, icon: '🎯', color: 'from-purple-500 to-pink-500', change: '+12%' },
            { label: 'Active Students', value: analytics.overview.activeUsers, icon: '👥', color: 'from-accent-cyan to-blue-400', change: '+8%' },
            { label: 'Average Score', value: analytics.overview.averageScore + '%', icon: '📊', color: 'from-green-500 to-emerald-400', change: '+3%' },
            { label: 'Pass Rate', value: analytics.overview.passRate + '%', icon: '✅', color: 'from-yellow-500 to-orange-400', change: '+2%' },
            { label: 'Total Students', value: analytics.overview.totalStudents, icon: '🎓', color: 'from-red-500 to-pink-500', change: '+15%' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{stat.icon}</div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-20`} />
              </div>
              <div className="font-display text-3xl font-bold mb-2">{stat.value}</div>
              <div className="flex items-center justify-between">
                <div className="text-gray-400 text-sm">{stat.label}</div>
                <div className="text-green-400 text-sm font-semibold">{stat.change}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Quiz Performance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="card p-8"
          >
            <h2 className="font-display text-2xl font-bold mb-6 gradient-text">
              Quiz Performance
            </h2>
            <div className="space-y-4">
              {analytics.quizPerformance.map((quiz, index) => (
                <div key={index} className="bg-dark-bg rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{quiz.name}</h3>
                    <span className="text-sm text-gray-400">{quiz.attempts} attempts</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Average Score</span>
                      <span className={`font-semibold ${
                        quiz.avgScore >= 80 ? 'text-green-400' : 
                        quiz.avgScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {quiz.avgScore}%
                      </span>
                    </div>
                    <div className="w-full bg-dark-card rounded-full h-2">
                      <div
                        className={`h-full rounded-full ${
                          quiz.avgScore >= 80 ? 'bg-green-500' : 
                          quiz.avgScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${quiz.avgScore}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Pass Rate</span>
                      <span className="font-semibold">{quiz.passRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="card p-8"
          >
            <h2 className="font-display text-2xl font-bold mb-6 gradient-text">
              Category Breakdown
            </h2>
            <div className="space-y-6">
              {analytics.categoryBreakdown.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{category.category}</h3>
                      <p className="text-sm text-gray-400">
                        {category.quizzes} quizzes • {category.attempts} attempts
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text">
                        {category.avgScore}%
                      </div>
                      <div className="text-xs text-gray-400">Avg Score</div>
                    </div>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-3">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-primary-500"
                      style={{ width: `${category.avgScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Weekly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card p-8 mb-8"
        >
          <h2 className="font-display text-2xl font-bold mb-6 gradient-text">
            Weekly Activity Trend
          </h2>
          <div className="grid grid-cols-7 gap-4">
            {analytics.weeklyTrend.map((day, index) => (
              <div key={index} className="text-center">
                <div className="bg-dark-bg rounded-xl p-4 mb-2 hover:bg-dark-bg/70 transition-colors">
                  <div className="font-display text-2xl font-bold mb-1">{day.attempts}</div>
                  <div className="text-xs text-gray-400 mb-2">attempts</div>
                  <div className={`text-sm font-semibold ${
                    day.avgScore >= 75 ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {day.avgScore}%
                  </div>
                </div>
                <div className="text-sm text-gray-400">{day.day}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="card p-8"
        >
          <h2 className="font-display text-2xl font-bold mb-6 gradient-text">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {analytics.recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-dark-bg rounded-xl p-4 hover:bg-dark-bg/70 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-cyan to-primary-500 flex items-center justify-center">
                    <span className="font-bold">{activity.student.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-semibold">{activity.student}</div>
                    <div className="text-sm text-gray-400">completed {activity.quiz}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${
                    activity.score >= 80 ? 'text-green-400' : 
                    activity.score >= 60 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {activity.score}%
                  </div>
                  <div className="text-xs text-gray-400">{activity.date}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewAnalytics;
