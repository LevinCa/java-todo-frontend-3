import {Todo} from "./Todo";
import {useContext, useEffect} from "react";
import {RequestFunctions} from "./ContextTodo";
import {useNavigate, useParams} from "react-router-dom";

type TodoProps = {
    todo: Todo,
}

export default function TodoItem(props: TodoProps) {

    const functions = useContext(RequestFunctions)
    const navigate = useNavigate()

    return (
        <div className={"TodoItem"}>
            <h3>{props.todo.description}</h3>
            <div className={"ButtonBar"}>
                <button type={"button"} id={"details"} className={"ButtonBarItem"} onClick={() => navigate(`/todo/detail/${props.todo.id}`)}>Details</button>
                <button type={"button"} id={"edit"} className={"ButtonBarItem"} onClick={() => navigate(`/todo/edit/${props.todo.id}`)}>Edit</button>
                <button type={"button"} id={"progress"} className={"ButtonBarItem"} onClick={() => props.todo.status === "DONE" ? functions.delete(props.todo) : functions.progress(props.todo)}>
                    {props.todo.status === "DONE" ? "Delete": "Progress"}
                </button>
            </div>
        </div>
    )
}