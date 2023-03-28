import {createContext, ReactElement, useEffect, useState} from "react";
import {Todo} from "./Todo";
import axios from "axios";

export const RequestFunctions = createContext<{change: (mode: string, id?: string, todo?: Todo) => void, post: (description: string) => void, progress: (todo: Todo) => void, put: (todo: Todo) => void, delete: (todo: Todo) => void, allTodos: Todo[], currentTodo: Todo, mode: string}>({change: () => {}, post: () => {}, progress: () => {}, put: () => {}, delete: () => {}, mode: "", currentTodo: {id: "", description: "", status: ""}, allTodos: []})


export default function ContextTodo(props: {children: ReactElement}) {

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
        <RequestFunctions.Provider value={{allTodos: todos, currentTodo: currentTodo, mode: mode, post: postTodo, progress: progressTodo, put: putTodo, delete: deleteTodo, change: changeMode}}>
            {props.children}
        </RequestFunctions.Provider>
    )

}