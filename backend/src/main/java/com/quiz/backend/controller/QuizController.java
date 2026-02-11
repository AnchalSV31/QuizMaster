package com.quiz.backend.controller;

import com.quiz.backend.model.Quiz;
import com.quiz.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {
    
    @Autowired
    private QuizService quizService;
    
    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getActiveQuizzes());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        return ResponseEntity.ok(quizService.getQuizById(id));
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        return ResponseEntity.ok(quizService.createQuiz(quiz));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long id, @RequestBody Quiz quiz) {
        return ResponseEntity.ok(quizService.updateQuiz(id, quiz));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.ok("Quiz deleted successfully");
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Quiz>> getQuizzesByCategory(@PathVariable String category) {
        return ResponseEntity.ok(quizService.getQuizzesByCategory(category));
    }
    
    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<Quiz>> getQuizzesByDifficulty(@PathVariable String difficulty) {
        return ResponseEntity.ok(quizService.getQuizzesByDifficulty(difficulty));
    }
}
