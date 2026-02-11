import api from './api';

export const quizService = {
  // Get all quizzes
  getAllQuizzes: async () => {
    const response = await api.get('/quizzes');
    return response.data;
  },

  // Get quiz by ID
  getQuizById: async (id) => {
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
  },

  // Create quiz (admin only)
  createQuiz: async (quizData) => {
    const response = await api.post('/quizzes', quizData);
    return response.data;
  },

  // Update quiz (admin only)
  updateQuiz: async (id, quizData) => {
    const response = await api.put(`/quizzes/${id}`, quizData);
    return response.data;
  },

  // Delete quiz (admin only)
  deleteQuiz: async (id) => {
    const response = await api.delete(`/quizzes/${id}`);
    return response.data;
  },

  // Get quizzes by category
  getQuizzesByCategory: async (category) => {
    const response = await api.get(`/quizzes/category/${category}`);
    return response.data;
  },

  // Get quizzes by difficulty
  getQuizzesByDifficulty: async (difficulty) => {
    const response = await api.get(`/quizzes/difficulty/${difficulty}`);
    return response.data;
  },
};
