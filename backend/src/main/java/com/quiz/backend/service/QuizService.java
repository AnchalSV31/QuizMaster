package com.quiz.backend.service;

import com.quiz.backend.model.Question;
import com.quiz.backend.model.Quiz;
import com.quiz.backend.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class QuizService {
    
    @Autowired
    private QuizRepository quizRepository;
    
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }
    
    public List<Quiz> getActiveQuizzes() {
        return quizRepository.findByIsActiveTrue();
    }
    
    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + id));
    }
    
    @Transactional
    public Quiz createQuiz(Quiz quiz) {
        // Set quiz reference for all questions
        if (quiz.getQuestions() != null) {
            for (Question question : quiz.getQuestions()) {
                question.setQuiz(quiz);
            }
        }
        return quizRepository.save(quiz);
    }
    
    @Transactional
    public Quiz updateQuiz(Long id, Quiz quizDetails) {
        Quiz quiz = getQuizById(id);
        
        quiz.setTitle(quizDetails.getTitle());
        quiz.setDescription(quizDetails.getDescription());
        quiz.setCategory(quizDetails.getCategory());
        quiz.setDifficulty(quizDetails.getDifficulty());
        quiz.setDurationMinutes(quizDetails.getDurationMinutes());
        quiz.setIsActive(quizDetails.getIsActive());
        
        return quizRepository.save(quiz);
    }
    
    public void deleteQuiz(Long id) {
        Quiz quiz = getQuizById(id);
        quizRepository.delete(quiz);
    }
    
    public List<Quiz> getQuizzesByCategory(String category) {
        return quizRepository.findByCategory(category);
    }
    
    public List<Quiz> getQuizzesByDifficulty(String difficulty) {
        return quizRepository.findByDifficulty(difficulty);
    }
}
