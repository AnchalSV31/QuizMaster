package com.quiz.backend.service;

import com.quiz.backend.dto.QuizAttemptRequest;
import com.quiz.backend.model.Question;
import com.quiz.backend.model.Quiz;
import com.quiz.backend.model.Result;
import com.quiz.backend.model.User;
import com.quiz.backend.repository.ResultRepository;
import com.quiz.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ResultService {
    
    @Autowired
    private ResultRepository resultRepository;
    
    @Autowired
    private QuizService quizService;
    
    @Autowired
    private UserRepository userRepository;
    
    public Result submitQuizAttempt(QuizAttemptRequest attemptRequest) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Quiz quiz = quizService.getQuizById(attemptRequest.getQuizId());
        
        // Calculate score
        Map<Long, Integer> userAnswers = attemptRequest.getAnswers();
        int correctAnswers = 0;
        int totalQuestions = quiz.getQuestions().size();
        
        for (Question question : quiz.getQuestions()) {
            Integer userAnswer = userAnswers.get(question.getId());
            if (userAnswer != null && userAnswer.equals(question.getCorrectAnswer())) {
                correctAnswers++;
            }
        }
        
        int score = (int) ((correctAnswers * 100.0) / totalQuestions);
        
        Result result = new Result();
        result.setUser(user);
        result.setQuiz(quiz);
        result.setScore(score);
        result.setTotalQuestions(totalQuestions);
        result.setCorrectAnswers(correctAnswers);
        result.setTimeTaken(attemptRequest.getTimeTaken());
        
        return resultRepository.save(result);
    }
    
    public List<Result> getStudentResults() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return resultRepository.findByUserIdOrderByCompletedAtDesc(user.getId());
    }
    
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }
    
    public List<Result> getResultsByQuizId(Long quizId) {
        return resultRepository.findByQuizId(quizId);
    }
}
