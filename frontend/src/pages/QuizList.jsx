import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockQuizzes = [
      {
        id: 1,
        title: 'JavaScript Fundamentals',
        description: 'Test your knowledge of JavaScript basics',
        questions: 10,
        duration: 10,
        difficulty: 'Easy',
        category: 'Programming'
      },
      {
        id: 2,
        title: 'React Advanced Concepts',
        description: 'Challenge yourself with advanced React topics',
        questions: 15,
        duration: 15,
        difficulty: 'Hard',
        category: 'Programming'
      },
      {
        id: 3,
        title: 'Data Structures & Algorithms',
        description: 'Master DSA concepts with this comprehensive quiz',
        questions: 20,
        duration: 20,
        difficulty: 'Medium',
        category: 'Computer Science'
      },
      {
        id: 4,
        title: 'Web Development Basics',
        description: 'HTML, CSS, and JavaScript fundamentals',
        questions: 12,
        duration: 12,
        difficulty: 'Easy',
        category: 'Web Development'
      },
      {
        id: 5,
        title: 'Database Management',
        description: 'SQL and database design principles',
        questions: 18,
        duration: 18,
        difficulty: 'Medium',
        category: 'Database'
      },
      {
        id: 6,
        title: 'System Design',
        description: 'Learn about scalable system architecture',
        questions: 15,
        duration: 15,
        difficulty: 'Hard',
        category: 'Architecture'
      }
    ];
    setQuizzes(mockQuizzes);
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400 bg-green-400/10';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'Hard':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen geometric-bg px-6 py-12">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Available Quizzes
          </h1>
          <p className="text-gray-400 text-lg mb-12">
            Choose a quiz to test your knowledge and skills
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link to={`/quiz/${quiz.id}`}>
                <div className="quiz-card group">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-accent-cyan uppercase tracking-wider">
                        {quiz.category}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-accent-cyan transition-colors">
                      {quiz.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {quiz.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <span>📝</span>
                        <span>{quiz.questions} Questions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>⏱️</span>
                        <span>{quiz.duration} min</span>
                      </div>
                    </div>
                  </div>

                  <button className="mt-4 w-full btn-primary text-sm">
                    Start Quiz
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizList;
