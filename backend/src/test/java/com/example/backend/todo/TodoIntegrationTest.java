package com.example.backend.todo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class TodoIntegrationTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;
    @Autowired
    TodoRepository todoRepository;
    Todo standardTodo;
    String standardJson;


    @BeforeEach
    void setUp() throws JsonProcessingException {
        standardTodo = new Todo("123", "Hello", TodoStatus.OPEN);
        standardJson = mapper.writeValueAsString(standardTodo);
    }

    @Test
    void getAllTodos_expectedEmptyList_WhenRepositoryIsEmpty() throws Exception {
        mockMvc.perform(get("/api/todo"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getAllTodos_expectedListWithOneElement_WhenRepositoryHasOneElement() throws Exception {
        todoRepository.save(standardTodo);
        mockMvc.perform(get("/api/todo"))
                .andExpect(status().isOk())
                .andExpect(content().json("[" + standardJson + "]"));
    }

    @Test
    void getTodoById_expectedToThrowException_whenIdDoesNotExistExists() {
        assertThatExceptionOfType(ServletException.class)
                .isThrownBy(() -> mockMvc.perform(get("/api/todo/123")));
    }

    @Test
    @DirtiesContext
    void getTodoById_expectedElementWithCorrectId_whenItExists() throws Exception {
        todoRepository.save(standardTodo);
        mockMvc.perform(get("/api/todo/123"))
                .andExpect(status().isOk())
                .andExpect(content().json(standardJson));
    }


    @Test
    @DirtiesContext
    void postNewTodo_expectedSavedObjectAndSaveItInTheRepository() throws Exception {
        String responseString = mockMvc.perform(post("/api/todo").contentType(MediaType.APPLICATION_JSON).content(standardJson))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                            "description": "Hello",
                            "status": "OPEN"
                        }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Todo responseTodo = mapper.readValue(responseString, Todo.class);
        assertThat(todoRepository.findById(responseTodo.id()))
                .isEqualTo(new Todo(responseTodo.id(), standardTodo.description(), standardTodo.status() ));
    }

    @Test
    @DirtiesContext
    void putTodo_expectUpdatedElement_whenElementExists() throws Exception {
        Todo expected = new Todo("123","Hell",TodoStatus.IN_PROGRESS);
        String expectedJson = mapper.writeValueAsString(expected);
        todoRepository.save(standardTodo);
        String responseString = mockMvc.perform(put("/api/todo/123")
                                                    .contentType(MediaType.APPLICATION_JSON)
                                                    .content(expectedJson))
                .andExpect(status().isAccepted())
                .andExpect(content().json(expectedJson))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Todo responseTodo = mapper.readValue(responseString, Todo.class);

        assertThat(todoRepository.findById(responseTodo.id())).isEqualTo(expected);
    }


    @Test
    @DirtiesContext
    void putTodo_expectNewElement_whenElementDoesNotExists() throws Exception {
        String responseString = mockMvc.perform(put("/api/todo/124")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(standardJson))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                            "description": "Hello",
                            "status": "OPEN"
                        }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Todo responseTodo = mapper.readValue(responseString, Todo.class);

        assertThat(todoRepository.findById(responseTodo.id()))
                .isEqualTo(new Todo(responseTodo.id(), standardTodo.description(), standardTodo.status()));
    }

    @Test
    @DirtiesContext
    void deleteTodo_expectedElementWitIdDeleted_whenItExists() throws Exception {
        todoRepository.save(standardTodo);

        mockMvc.perform(delete("/api/todo/123"))
                .andExpect(status().isNoContent());

        assertThat(todoRepository.existsById("123")).isFalse();
    }

    @Test
    @DirtiesContext
    void deleteTodo_expectedException_whenElementWithIdDoesNotExist() {
        todoRepository.save(standardTodo);

        assertThatExceptionOfType(ServletException.class)
                .isThrownBy(() -> mockMvc.perform(delete("/api/todo/124")));
    }
}