package com.example.backend.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/todo", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;


    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        return new ResponseEntity<>(todoService.findAllTodos(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable String id) {
        return new ResponseEntity<>(todoService.findTodoById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Todo> postNewTodo(@RequestBody Todo todo) {
        return new ResponseEntity<>(todoService.saveTodo(todo), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Todo> putTodo(@PathVariable String id, @RequestBody Todo todo) {
        return todoService.updateTodo(id, todo);
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteTodo(@PathVariable String id) {
        todoService.removeTodo(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
