import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, correct, quizTitle } = location.state || {};
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (!location.state) {
      navigate('/quizzes');
      return;
    }

    // Animate score counting
    const duration = 2000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score, location.state, navigate]);

  const getScoreColor = () => {
    if (score >= 80) return 'from-green-400 to-emerald-500';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-accent-coral';
  };

  const getScoreMessage = () => {
    if (score >= 80) return 'Excellent Work! 🎉';
    if (score >= 60) return 'Good Job! 👍';
    return 'Keep Practicing! 💪';
  };

  return (
    <div className="min-h-screen geometric-bg px-6 py-12 flex items-center justify-center">
      <div className="container mx-auto max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card p-12 text-center"
        >
          {/* Trophy Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-8xl mb-6"
          >
            {score >= 80 ? '🏆' : score >= 60 ? '🎯' : '📚'}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl font-bold mb-2 gradient-text"
          >
            Quiz Complete!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 mb-8"
          >
            {quizTitle}
          </motion.p>

          {/* Score Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="mb-8"
          >
            <div className={`inline-flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br ${getScoreColor()} p-1`}>
              <div className="w-full h-full rounded-full bg-dark-card flex flex-col items-center justify-center">
                <div className="font-display text-5xl font-bold text-white">
                  {Math.round(animatedScore)}%
                </div>
                <div className="text-gray-400 text-sm mt-2">Your Score</div>
              </div>
            </div>
          </motion.div>

          {/* Score Message */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="font-display text-3xl font-bold mb-8"
          >
            {getScoreMessage()}
          </motion.h2>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-dark-bg rounded-xl p-4">
              <div className="text-3xl mb-2">✅</div>
              <div className="text-2xl font-bold text-green-400">{correct}</div>
              <div className="text-sm text-gray-400">Correct</div>
            </div>
            <div className="bg-dark-bg rounded-xl p-4">
              <div className="text-3xl mb-2">❌</div>
              <div className="text-2xl font-bold text-red-400">{total - correct}</div>
              <div className="text-sm text-gray-400">Wrong</div>
            </div>
            <div className="bg-dark-bg rounded-xl p-4">
              <div className="text-3xl mb-2">📝</div>
              <div className="text-2xl font-bold text-primary-400">{total}</div>
              <div className="text-sm text-gray-400">Total</div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/quizzes')}
              className="btn-primary"
            >
              Browse More Quizzes
            </button>
            <button
              onClick={() => navigate(-2)}
              className="btn-secondary"
            >
              Retry Quiz
            </button>
          </motion.div>
        </motion.div>

        {/* Performance Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="card p-8 mt-6"
        >
          <h3 className="font-display text-xl font-bold mb-4 gradient-text">
            Performance Breakdown
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Accuracy</span>
                <span className="font-semibold">{Math.round(score)}%</span>
              </div>
              <div className="w-full bg-dark-bg rounded-full h-2">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getScoreColor()}`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-border">
              <div>
                <div className="text-gray-400 text-sm">Questions Attempted</div>
                <div className="font-display text-2xl font-bold">{total}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Pass Mark</div>
                <div className="font-display text-2xl font-bold">60%</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Result;
