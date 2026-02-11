package com.quiz.backend.controller;

import com.quiz.backend.dto.QuizAttemptRequest;
import com.quiz.backend.model.Result;
import com.quiz.backend.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
public class ResultController {
    
    @Autowired
    private ResultService resultService;
    
    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Result> submitQuizAttempt(@RequestBody QuizAttemptRequest attemptRequest) {
    return ResponseEntity.ok(resultService.submitQuizAttempt(attemptRequest));
}

    
    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Result>> getStudentResults() {
        return ResponseEntity.ok(resultService.getStudentResults());
    }
    
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Result>> getAllResults() {
        return ResponseEntity.ok(resultService.getAllResults());
    }
    
    @GetMapping("/quiz/{quizId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Result>> getResultsByQuizId(@PathVariable Long quizId) {
        return ResponseEntity.ok(resultService.getResultsByQuizId(quizId));
    }
}
