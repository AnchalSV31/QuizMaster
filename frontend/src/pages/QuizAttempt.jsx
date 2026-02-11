import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const QuizAttempt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    // Mock quiz data - replace with actual API call
    const mockQuiz = {
      id,
      title: 'JavaScript Fundamentals',
      questions: [
        {
          id: 1,
          question: 'What is the purpose of the "use strict" directive in JavaScript?',
          options: [
            'To enable strict mode',
            'To disable errors',
            'To speed up execution',
            'To enable debugging'
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          question: 'Which method is used to add an element at the end of an array?',
          options: ['push()', 'pop()', 'shift()', 'unshift()'],
          correctAnswer: 0
        },
        {
          id: 3,
          question: 'What does the "typeof" operator return for null?',
          options: ['null', 'object', 'undefined', 'number'],
          correctAnswer: 1
        },
        {
          id: 4,
          question: 'Which of the following is not a JavaScript data type?',
          options: ['String', 'Boolean', 'Float', 'Undefined'],
          correctAnswer: 2
        },
        {
          id: 5,
          question: 'What is the output of: console.log(2 + "2")?',
          options: ['4', '22', 'NaN', 'Error'],
          correctAnswer: 1
        }
      ]
    };
    setQuizData(mockQuiz);
  }, [id]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, currentQuestion]);

  const handleAnswer = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(60);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimeLeft(60);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let correctAnswers = 0;
    quizData.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / quizData.questions.length) * 100;
    
    // Navigate to results with score
    navigate('/result', { 
      state: { 
        score, 
        total: quizData.questions.length,
        correct: correctAnswers,
        quizTitle: quizData.title
      } 
    });
  };

  if (!quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl gradient-text">Loading...</div>
      </div>
    );
  }

  const question = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div className="min-h-screen geometric-bg px-6 py-12">
      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-display text-2xl font-bold gradient-text">
              {quizData.title}
            </h1>
            <div className="text-right">
              <div className="text-sm text-gray-400">Question</div>
              <div className="font-display text-xl font-bold">
                {currentQuestion + 1} / {quizData.questions.length}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-dark-bg rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-accent-cyan to-primary-500"
            />
          </div>
        </motion.div>

        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-6 mb-8"
        >
          <div className="flex items-center justify-center space-x-4">
            <span className="text-4xl">⏱️</span>
            <div>
              <div className="text-sm text-gray-400">Time Remaining</div>
              <div className={`font-display text-3xl font-bold ${timeLeft <= 10 ? 'text-accent-coral' : 'text-accent-cyan'}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="card p-8 mb-8"
          >
            <h2 className="font-display text-2xl font-bold mb-8">
              {question.question}
            </h2>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    answers[currentQuestion] === index
                      ? 'border-primary-500 bg-primary-500/20'
                      : 'border-dark-border hover:border-primary-500/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion] === index
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-dark-border'
                    }`}>
                      {answers[currentQuestion] === index && (
                        <div className="w-3 h-3 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="font-semibold">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`btn-secondary ${
              currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            ← Previous
          </button>

          {currentQuestion === quizData.questions.length - 1 ? (
            <button onClick={handleSubmit} className="btn-primary">
              Submit Quiz
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary">
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
