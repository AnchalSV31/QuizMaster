import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen geometric-bg">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-display text-6xl md:text-8xl font-bold mb-6"
          >
            Master Your
            <span className="gradient-text block mt-2">Knowledge</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Test your skills, challenge yourself, and track your progress with our modern quiz platform
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            {isAuthenticated ? (
              <Link to="/quizzes" className="btn-primary text-lg px-8 py-4">
                Browse Quizzes
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                  Get Started
                </Link>
                <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                  Login
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mt-32 relative z-10"
        >
          {[
            {
              icon: '⚡',
              title: 'Real-time Scoring',
              description: 'Get instant feedback on your performance with live scoring and analytics'
            },
            {
              icon: '🎯',
              title: 'Timed Challenges',
              description: 'Test your speed and accuracy with time-limited questions'
            },
            {
              icon: '📊',
              title: 'Track Progress',
              description: 'Monitor your improvement and identify areas for growth'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
              className="card p-8 hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="font-display text-2xl font-bold mb-3 gradient-text">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-32 card p-12 relative z-10"
        >
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { number: '500+', label: 'Active Users' },
              { number: '1000+', label: 'Quizzes Available' },
              { number: '50K+', label: 'Questions Answered' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="font-display text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
