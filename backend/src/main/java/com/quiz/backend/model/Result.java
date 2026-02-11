package com.quiz.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "results")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Quiz quiz;

    private Integer score;
    private Integer totalQuestions;
    private Integer correctAnswers;
    private Integer timeTaken;
    private LocalDateTime completedAt;

    @PrePersist
    public void onCreate() {
        completedAt = LocalDateTime.now();
    }

    // ===== GETTERS & SETTERS =====

    public void setUser(User user) { this.user = user; }

    public void setQuiz(Quiz quiz) { this.quiz = quiz; }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public Integer getScore() {
        return score;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public Integer getCorrectAnswers() {
        return correctAnswers;
    }

    public Integer getTimeTaken() {
        return timeTaken;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public void setScore(Integer score) { this.score = score; }

    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }

    public void setCorrectAnswers(Integer correctAnswers) { this.correctAnswers = correctAnswers; }

    public void setTimeTaken(Integer timeTaken) { this.timeTaken = timeTaken; }
}
