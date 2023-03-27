package com.example.backend.todo;

public record Todo(
        String id,
        String description,
        TodoStatus status
) {
}
