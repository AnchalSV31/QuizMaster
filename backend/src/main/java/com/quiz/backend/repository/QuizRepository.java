package com.quiz.backend.repository;

import com.quiz.backend.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByIsActiveTrue();
    List<Quiz> findByCategory(String category);
    List<Quiz> findByDifficulty(String difficulty);
}
