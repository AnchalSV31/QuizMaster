import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'Medium',
    duration: 10
  });

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }
  ]);

  const handleQuizDataChange = (e) => {
    setQuizData({
      ...quizData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuestionChange = (questionId, field, value) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    setQuestions(questions.map(q =>
      q.id === questionId
        ? {
            ...q,
            options: q.options.map((opt, idx) =>
              idx === optionIndex ? value : opt
            )
          }
        : q
    ));
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]);
  };

  const removeQuestion = (questionId) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== questionId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    if (!quizData.title || !quizData.description || !quizData.category) {
      alert('Please fill in all quiz details');
      return;
    }

    const invalidQuestion = questions.find(q =>
      !q.question || q.options.some(opt => !opt)
    );

    if (invalidQuestion) {
      alert('Please fill in all questions and options');
      return;
    }

    // Mock API call
    console.log('Creating quiz:', { ...quizData, questions });
    alert('Quiz created successfully!');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen geometric-bg px-6 py-12">
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-5xl font-bold mb-4 gradient-text">
            Create New Quiz
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Design a comprehensive quiz for your students
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Quiz Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-8"
          >
            <h2 className="font-display text-2xl font-bold mb-6 gradient-text">
              Quiz Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Quiz Title</label>
                <input
                  type="text"
                  name="title"
                  value={quizData.title}
                  onChange={handleQuizDataChange}
                  placeholder="e.g., JavaScript Fundamentals"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={quizData.description}
                  onChange={handleQuizDataChange}
                  placeholder="Brief description of the quiz..."
                  className="input-field min-h-[100px]"
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={quizData.category}
                    onChange={handleQuizDataChange}
                    placeholder="e.g., Programming"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Difficulty</label>
                  <select
                    name="difficulty"
                    value={quizData.difficulty}
                    onChange={handleQuizDataChange}
                    className="input-field"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={quizData.duration}
                    onChange={handleQuizDataChange}
                    min="1"
                    className="input-field"
                    required
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Questions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold gradient-text">
                Questions ({questions.length})
              </h2>
              <button
                type="button"
                onClick={addQuestion}
                className="btn-primary"
              >
                ➕ Add Question
              </button>
            </div>

            <AnimatePresence>
              {questions.map((question, qIndex) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: qIndex * 0.1 }}
                  className="card p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-xl font-bold">
                      Question {qIndex + 1}
                    </h3>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(question.id)}
                        className="text-accent-coral hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Question Text
                      </label>
                      <textarea
                        value={question.question}
                        onChange={(e) =>
                          handleQuestionChange(question.id, 'question', e.target.value)
                        }
                        placeholder="Enter your question..."
                        className="input-field min-h-[80px]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-3">Options</label>
                      <div className="space-y-3">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name={`correct-${question.id}`}
                              checked={question.correctAnswer === optIndex}
                              onChange={() =>
                                handleQuestionChange(question.id, 'correctAnswer', optIndex)
                              }
                              className="w-5 h-5 text-primary-500"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(question.id, optIndex, e.target.value)
                              }
                              placeholder={`Option ${optIndex + 1}`}
                              className="input-field flex-1"
                              required
                            />
                            {question.correctAnswer === optIndex && (
                              <span className="text-green-400 text-sm font-semibold">
                                ✓ Correct
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Submit Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-end space-x-4"
          >
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Quiz
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
