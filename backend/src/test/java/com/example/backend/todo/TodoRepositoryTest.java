package com.example.backend.todo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.*;

class TodoRepositoryTest {

    TodoRepository todoRepository = new TodoRepository();
    Todo todoOne;
    Todo todoTwo;
    Todo todoThree;

    @BeforeEach
    void setUp() {
        todoOne = new Todo("123", "Hello", TodoStatus.OPEN);
        todoTwo = new Todo("234", "World", TodoStatus.IN_PROGRESS);
        todoThree = new Todo("345", "Test", TodoStatus.DONE);
        todoRepository.getTodoList().addAll(List.of(todoOne, todoThree));
    }

    @Test
    void findAll() {
        assertThat(todoRepository.findAll())
                .contains(todoOne)
                .contains(todoThree)
                .isInstanceOf(ArrayList.class);
    }

    @Test
    void findById() {
        assertThat(todoRepository.findById("123"))
                .isEqualTo(todoOne);
    }

    @Test
    void findById_expectedNoSuchElementException_whenIdNotFound() {
        assertThatThrownBy(() -> todoRepository.findById("124"))
                .isInstanceOf(NoSuchElementException.class);
    }

    @Test
    void save() {
        assertThat(todoRepository.save(todoTwo))
                .isEqualTo(todoTwo);
    }

    @Test
    void existsById() {
        assertThat(todoRepository.existsById("123"))
                .isTrue();
        assertThat(todoRepository.existsById("124"))
                .isFalse();
    }

    @Test
    void deleteById() {
        todoRepository.deleteById("123");
        assertThat(todoRepository.getTodoList())
                .contains(todoThree)
                .doesNotContain(todoOne)
                .doesNotContain(todoTwo);
    }

    @Test
    void deleteById_expectedNoSuchElementException_whenIdDoesNotExist() {
        assertThatThrownBy(() -> todoRepository.deleteById("124"))
                .isInstanceOf(NoSuchElementException.class);
    }
}