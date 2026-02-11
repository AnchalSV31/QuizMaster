package com.quiz.backend.repository;

import com.quiz.backend.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByUserId(Long userId);
    List<Result> findByQuizId(Long quizId);
    List<Result> findByUserIdOrderByCompletedAtDesc(Long userId);
}
