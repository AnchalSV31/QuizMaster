import api from './api';

export const resultService = {
  // Submit quiz attempt (student only)
  submitQuizAttempt: async (attemptData) => {
    const response = await api.post('/results', attemptData);
    return response.data;
  },

  // Get student's own results (student only)
  getStudentResults: async () => {
    const response = await api.get('/results/student');
    return response.data;
  },

  // Get all results (admin only)
  getAllResults: async () => {
    const response = await api.get('/results/all');
    return response.data;
  },

  // Get results by quiz ID (admin only)
  getResultsByQuizId: async (quizId) => {
    const response = await api.get(`/results/quiz/${quizId}`);
    return response.data;
  },
};
