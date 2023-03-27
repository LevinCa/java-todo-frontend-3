package com.example.backend.todo;

import com.example.backend.services.IdService;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

import static org.assertj.core.api.BDDAssertions.*;
import static org.mockito.Mockito.*;

class TodoServiceTest {

    TodoRepository todoRepository = mock(TodoRepository.class);
    IdService idService = mock(IdService.class);
    TodoService todoService = new TodoService(todoRepository, idService);


    @Test
    void findAllTodos_whenListHasElements_thenReturnListWithAllElements() {
        //Given
        when(todoRepository.findAll())
                .thenReturn(List.of(
                        new Todo("123", "Test1", TodoStatus.IN_PROGRESS),
                        new Todo("1234", "Test2", TodoStatus.OPEN)
                ));

        //When
        List<Todo> actual = todoService.findAllTodos();
        List<Todo> expected = List.of(
                new Todo("123", "Test1", TodoStatus.IN_PROGRESS),
                new Todo("1234", "Test2", TodoStatus.OPEN)
        );

        //Then
        verify(todoRepository).findAll();
        then(actual).isEqualTo(expected);
    }

    @Test
    void findAllTodos_whenListIsEmpty_thenReturnEmptyList() {
        //Given
        when(todoRepository.findAll())
                .thenReturn(Collections.emptyList());

        //When
        List<Todo> actual = todoService.findAllTodos();
        List<Todo> expected = Collections.emptyList();

        //Then
        verify(todoRepository).findAll();
        then(actual).isEqualTo(expected);
    }

    @Test
    void findTodoById_whenElementWithIdFound_thenReturnElement() {
        //Given
        when(todoRepository.findById("123"))
                .thenReturn(new Todo("123", "Test1", TodoStatus.OPEN));

        //When
        Todo actual = todoService.findTodoById("123");
        Todo expected = new Todo("123", "Test1", TodoStatus.OPEN);

        //Then
        verify(todoRepository).findById("123");
        then(actual).isEqualTo(expected);
    }

    @Test
    void findTodoById_whenElementWithIdNotFound_ThenThrowException() {
        //Given
        when(todoRepository.findById("345"))
                .thenThrow(NoSuchElementException.class);

        //When
        Throwable throwable = catchThrowable(() -> todoService.findTodoById("345"));

        //Then
        verify(todoRepository).findById("345");
        then(throwable).isInstanceOf(NoSuchElementException.class);
    }

    @Test
    void saveTodo_whenElementDoesNotExist_thenReturnElement() {
        //Given
        when(idService.create())
                .thenReturn("123");
        when(todoRepository.save(new Todo("123", "Test1", TodoStatus.OPEN)))
                .thenReturn(new Todo("123", "Test1", TodoStatus.OPEN));

        //When
        Todo actual = todoService.saveTodo(new Todo("123", "Test1", TodoStatus.OPEN));
        Todo expected = new Todo("123", "Test1", TodoStatus.OPEN);

        //Then
        verify(idService).create();
        verify(todoRepository).save(new Todo("123", "Test1", TodoStatus.OPEN));
        then(actual).isEqualTo(expected);
    }

    @Test
    void updateTodo_whenElementAlreadyExists_thenReturnResponseEntityWithElementAnd202() {
        //Given
        when(todoRepository.existsById("123"))
                .thenReturn(true);
        when(todoRepository.save(new Todo("123", "Test1",TodoStatus.OPEN)))
                .thenReturn(new Todo("123", "Test1",TodoStatus.OPEN));

        //When
        ResponseEntity<Todo> actual =
                todoService.updateTodo("123", new Todo("123", "Test1",TodoStatus.OPEN));
        ResponseEntity<Todo> expected =
                new ResponseEntity<>(new Todo("123", "Test1",TodoStatus.OPEN),
                        HttpStatus.ACCEPTED);

        //Then
        verify(todoRepository).existsById("123");
        verify(todoRepository).save(new Todo("123", "Test1",TodoStatus.OPEN));
        then(actual).isEqualTo(expected);
    }

    @Test
    void updateTodo_whenElementDoesNotExists_thenReturnResponseEntityWithElementAnd201() {
        //Given
        when(todoRepository.existsById("123"))
                .thenReturn(false);
        when(todoRepository.save(new Todo("567", "Test1",TodoStatus.OPEN)))
                .thenReturn(new Todo("567", "Test1",TodoStatus.OPEN));
        when(idService.create()).thenReturn("567");

        //When
        ResponseEntity<Todo> actual =
                todoService.updateTodo("123", new Todo("123", "Test1",TodoStatus.OPEN));
        ResponseEntity<Todo> expected =
                new ResponseEntity<>(new Todo("567", "Test1",TodoStatus.OPEN),
                        HttpStatus.CREATED);

        //Then
        verify(todoRepository).existsById("123");
        verify(todoRepository).save(new Todo("567", "Test1",TodoStatus.OPEN));
        then(actual).isEqualTo(expected);
    }

    @Test
    void removeTodo_expectedNoSuchElementException_WhenIdDoesNotExist() {
        //Given
        doThrow(NoSuchElementException.class)
                .when(todoRepository).deleteById("124");

        //When
        Throwable throwable = catchThrowable(() -> todoService.removeTodo("124"));

        //Then
        verify(todoRepository).deleteById("124");
        then(throwable).isInstanceOf(NoSuchElementException.class);
    }

}