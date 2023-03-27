import {Todo} from "./Todo";
import {useContext} from "react";
import {RequestFunctions} from "./App";

type TodoProps = {
    todo: Todo,
}

export default function TodoItem(props: TodoProps) {
    const functions = useContext(RequestFunctions)
    return (
        <div className={"TodoItem"}>
            <h3>{props.todo.description}</h3>
            <div className={"ButtonBar"}>
                <button type={"button"} id={"details"} className={"ButtonBarItem"} onClick={() => functions.change("detail", props.todo.id)}>Details</button>
                <button type={"button"} id={"edit"} className={"ButtonBarItem"} onClick={() => functions.change("edit", props.todo.id, props.todo)}>Edit</button>
                <button type={"button"} id={"progress"} className={"ButtonBarItem"} onClick={() => props.todo.status === "DONE" ? functions.delete(props.todo) : functions.progress(props.todo)}>
                    {props.todo.status === "DONE" ? "Delete": "Progress"}
                </button>
            </div>
        </div>
    )
}