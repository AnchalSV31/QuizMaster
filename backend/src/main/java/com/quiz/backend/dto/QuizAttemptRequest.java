package com.quiz.backend.dto;

import lombok.Data;

import java.util.Map;

@Data
public class QuizAttemptRequest {
    private Long quizId;
    private Map<Long, Integer> answers; // questionId -> selectedAnswer (0-3)
    private Integer timeTaken; // in seconds

    public Long getQuizId() {
        return quizId;
    }

    public void setQuizId(Long quizId) {
        this.quizId = quizId;
    }

    public Map<Long, Integer> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<Long, Integer> answers) {
        this.answers = answers;
    }

    public Integer getTimeTaken() {
        return timeTaken;
    }

    public void setTimeTaken(Integer timeTaken) {
        this.timeTaken = timeTaken;
    }
}
