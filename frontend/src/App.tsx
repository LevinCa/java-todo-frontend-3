import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import NavigationBar from "./NavigationBar";
import {Todo} from "./Todo";
import axios from "axios";
import TodoGallery from "./TodoGallery";
import DetailView from "./DetailView";
import StatusView from "./StatusView";
import AddBar from "./AddBar";
import EditView from "./EditView";

const RequestList = createContext<{}>({})

function App() {

    const [todos, setTodos] = useState<Todo[]>([])
    const [mode, setMode] = useState<string>("overview")
    const [currentTodo, setCurrentTodo] = useState<Todo>({id: "", description: "", status: ""})

    useEffect(
        () => getAllTodos()
        , []
    )

    function getAllTodos(): void {
        axios.get<Todo[]>("/api/todo")
            .then(response => {
                setTodos(response.data)
            })
    }

    function getTodoById(id: string): void {
        axios.get<Todo>(`/api/todo/${id}`)
            .then(response => {
                setCurrentTodo(response.data)
            })
    }

    function postTodo(description: string): void {
        axios.post("/api/todo", {description: description}).then(getAllTodos)
    }

    function putTodo(todo: Todo): void {
        axios.put(`/api/todo/${todo.id}`, todo).then(getAllTodos)
    }

    function progressTodo(todo: Todo): void {
        let status: string
        if (todo.status === "OPEN") {
            status = "IN_PROGRESS"
        } else status = "DONE"
        axios.put(`/api/todo/${todo.id}`, {
            id: todo.id,
            description: todo.description,
            status: status
        }).then(getAllTodos)
    }

    function deleteTodo(todo: Todo): void {
        axios.delete(`/api/todo/${todo.id}`).then(getAllTodos)
    }

    function changeMode(newMode: string, id?: string, todo?: Todo): void {
        setMode(newMode)
        if (id) {
            getTodoById(id)
        }
        if (todo) {
            setCurrentTodo(todo)
        }
    }

    return (
        <div className="App">
            <RequestList.Provider value={{post: postTodo, put: putTodo, progress: progressTodo, delete: deleteTodo, change: changeMode}}>
                <header className="App-header">
                    <h1> Todo App</h1>
                    <NavigationBar changeModeFunction={changeMode} mode={mode}/>
                </header>
                {
                    mode.toLowerCase() === "overview"
                    &&
                    <TodoGallery todos={todos} changeModeFunction={changeMode} progressFunction={progressTodo}
                                 putFunction={putTodo}
                                 deleteFunction={deleteTodo}/>
                }
                {
                    mode.toLowerCase() === "detail"
                    && currentTodo.id !== ""
                    && <DetailView todo={currentTodo} changeModeFunction={changeMode}/>
                }
                {
                    mode.toLowerCase() === "edit"
                    && currentTodo.id !== ""
                    && <EditView todo={currentTodo} changeModeFunction={changeMode} updateFunction={putTodo}/>
                }
                {
                    (
                        mode.toLowerCase() === "open"
                        || mode.toLowerCase() === "in_progress"
                        || mode.toLowerCase() === "done"
                    )
                    && <StatusView todos={todos} mode={mode} changeModeFunction={changeMode} deleteFunction={deleteTodo}
                                   putFunction={putTodo} progressFunction={progressTodo}/>
                }
                <AddBar addFunction={postTodo}/>
            </RequestList.Provider>
        </div>
    )
        ;
}

export default App;
