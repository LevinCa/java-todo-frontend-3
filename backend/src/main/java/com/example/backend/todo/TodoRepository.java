package com.example.backend.todo;

import lombok.Getter;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@Getter
public class TodoRepository {
    private final List<Todo> todoList = new ArrayList<>();

    public TodoRepository() {
        this.todoList.add(new Todo("123", "Bla Bla", TodoStatus.OPEN));
        this.todoList.add(new Todo("234", "Test", TodoStatus.OPEN));
        this.todoList.add(new Todo("345", "What Am I Doing?", TodoStatus.IN_PROGRESS));
        this.todoList.add(new Todo("456", "This is just a Test", TodoStatus.DONE));
    }

    public List<Todo> findAll() {
        return this.todoList;
    }

    public Todo findById(String id) throws NoSuchElementException {
        return this.todoList.stream()
                .filter(e -> e.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Todo with id: " + id + " not found!"));
    }

    public Todo save(Todo newTodo) {
        this.todoList.add(newTodo);
        return newTodo;
    }

    public boolean existsById(String id) {
        return this.todoList.stream().anyMatch(e -> e.id().equals(id));
    }

    public void deleteById(String id) {
        this.todoList.remove(this.findById(id));
    }
}
