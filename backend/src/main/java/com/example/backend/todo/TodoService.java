package com.example.backend.todo;

import com.example.backend.services.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;
    private final IdService idService;

    public List<Todo> findAllTodos() {
        return todoRepository.findAll();
    }

    public Todo findTodoById(String id) {
        return todoRepository.findById(id);
    }

    public Todo saveTodo(Todo todo) {
        Todo newTodo = new Todo(idService.create(), todo.description(), TodoStatus.OPEN);
        return todoRepository.save(newTodo);
    }

    public ResponseEntity<Todo> updateTodo(String id, Todo todo) {
        if (!todoRepository.existsById(id)) {
            return new ResponseEntity<>(this.saveTodo(todo), HttpStatus.CREATED);
        }
        todoRepository.deleteById(id);
        return new ResponseEntity<>(
                todoRepository.save(new Todo(id, todo.description(), todo.status())),
                HttpStatus.ACCEPTED);
    }

    public void removeTodo(String id) {
        todoRepository.deleteById(id);
    }
}
