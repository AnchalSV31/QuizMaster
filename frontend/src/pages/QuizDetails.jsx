import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuizDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizDetails, setQuizDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, questions, attempts

  useEffect(() => {
    // Mock quiz details data
    const mockQuizDetails = {
      id,
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics',
      category: 'Programming',
      difficulty: 'Easy',
      duration: 10,
      totalQuestions: 10,
      createdBy: 'Admin User',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-05',
      isActive: true,
      stats: {
        totalAttempts: 45,
        averageScore: 78,
        passRate: 72,
        highestScore: 100,
        lowestScore: 45
      },
      questions: [
        {
          id: 1,
          question: 'What is the purpose of the "use strict" directive?',
          options: ['Enable strict mode', 'Disable errors', 'Speed up execution', 'Enable debugging'],
          correctAnswer: 0,
          timesAnswered: 45,
          correctRate: 82
        },
        {
          id: 2,
          question: 'Which method adds an element at the end of an array?',
          options: ['push()', 'pop()', 'shift()', 'unshift()'],
          correctAnswer: 0,
          timesAnswered: 45,
          correctRate: 95
        },
        {
          id: 3,
          question: 'What does typeof null return?',
          options: ['null', 'object', 'undefined', 'number'],
          correctAnswer: 1,
          timesAnswered: 45,
          correctRate: 58
        }
      ],
      recentAttempts: [
        { id: 1, student: 'Alice Johnson', score: 85, completedAt: '2024-02-11 10:30', timeTaken: '8m 45s' },
        { id: 2, student: 'Bob Smith', score: 70, completedAt: '2024-02-11 09:15', timeTaken: '9m 20s' },
        { id: 3, student: 'Carol Williams', score: 92, completedAt: '2024-02-10 15:45', timeTaken: '7m 30s' },
        { id: 4, student: 'David Brown', score: 65, completedAt: '2024-02-10 14:20', timeTaken: '10m 00s' },
        { id: 5, student: 'Emma Davis', score: 88, completedAt: '2024-02-10 11:10', timeTaken: '8m 15s' }
      ]
    };
    setQuizDetails(mockQuizDetails);
  }, [id]);

  const handleDeleteQuiz = () => {
    if (window.confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
      // Mock delete - replace with actual API call
      alert('Quiz deleted successfully!');
      navigate('/admin');
    }
  };

  const handleToggleActive = () => {
    setQuizDetails({
      ...quizDetails,
      isActive: !quizDetails.isActive
    });
    alert(`Quiz ${!quizDetails.isActive ? 'activated' : 'deactivated'} successfully!`);
  };

  if (!quizDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl gradient-text font-display">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen geometric-bg px-6 py-12">
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/admin')}
            className="text-accent-cyan hover:underline mb-4 flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display text-5xl font-bold mb-4 gradient-text">
                {quizDetails.title}
              </h1>
              <p className="text-gray-400 text-lg mb-4">{quizDetails.description}</p>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/20 text-primary-400">
                  {quizDetails.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400">
                  {quizDetails.difficulty}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  quizDetails.isActive
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {quizDetails.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to={`/admin/edit/${id}`} className="btn-primary">
                Edit Quiz
              </Link>
              <button onClick={handleToggleActive} className="btn-secondary">
                {quizDetails.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button onClick={handleDeleteQuiz} className="btn-danger">
                Delete
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          {[
            { label: 'Total Attempts', value: quizDetails.stats.totalAttempts, icon: '🎯' },
            { label: 'Avg Score', value: quizDetails.stats.averageScore + '%', icon: '📊' },
            { label: 'Pass Rate', value: quizDetails.stats.passRate + '%', icon: '✅' },
            { label: 'Highest', value: quizDetails.stats.highestScore + '%', icon: '🏆' },
            { label: 'Lowest', value: quizDetails.stats.lowestScore + '%', icon: '📉' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="font-display text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card mb-8"
        >
          <div className="flex border-b border-dark-border">
            {[
              { id: 'overview', label: 'Overview', icon: '📋' },
              { id: 'questions', label: 'Questions', icon: '❓' },
              { id: 'attempts', label: 'Attempts', icon: '📝' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'border-b-2 border-primary-500 text-primary-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4 text-lg">Quiz Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Questions:</span>
                        <span className="font-semibold">{quizDetails.totalQuestions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="font-semibold">{quizDetails.duration} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Created By:</span>
                        <span className="font-semibold">{quizDetails.createdBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Created:</span>
                        <span className="font-semibold">{quizDetails.createdAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Updated:</span>
                        <span className="font-semibold">{quizDetails.updatedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4 text-lg">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-gray-400">Average Score</span>
                          <span className="font-semibold">{quizDetails.stats.averageScore}%</span>
                        </div>
                        <div className="w-full bg-dark-bg rounded-full h-2">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-primary-500"
                            style={{ width: `${quizDetails.stats.averageScore}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-gray-400">Pass Rate</span>
                          <span className="font-semibold">{quizDetails.stats.passRate}%</span>
                        </div>
                        <div className="w-full bg-dark-bg rounded-full h-2">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                            style={{ width: `${quizDetails.stats.passRate}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Questions Tab */}
            {activeTab === 'questions' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {quizDetails.questions.map((question, index) => (
                  <div key={question.id} className="bg-dark-bg rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold text-lg">
                        Question {index + 1}: {question.question}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        question.correctRate >= 70
                          ? 'bg-green-500/20 text-green-400'
                          : question.correctRate >= 50
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {question.correctRate}% correct
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-lg border-2 ${
                            optIndex === question.correctAnswer
                              ? 'border-green-500 bg-green-500/10'
                              : 'border-dark-border'
                          }`}
                        >
                          {option}
                          {optIndex === question.correctAnswer && (
                            <span className="ml-2 text-green-400">✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-400">
                      Answered {question.timesAnswered} times
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Attempts Tab */}
            {activeTab === 'attempts' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="space-y-4">
                  {quizDetails.recentAttempts.map((attempt) => (
                    <div
                      key={attempt.id}
                      className="flex items-center justify-between bg-dark-bg rounded-xl p-4"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-cyan to-primary-500 flex items-center justify-center">
                          <span className="font-bold">{attempt.student.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{attempt.student}</div>
                          <div className="text-sm text-gray-400">
                            {attempt.completedAt} • {attempt.timeTaken}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          attempt.score >= 80 ? 'text-green-400' :
                          attempt.score >= 60 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {attempt.score}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizDetails;
