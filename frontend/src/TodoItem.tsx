import {Todo} from "./Todo";

type TodoProps = {
    todo: Todo,
    changeModeFunction: (newMode: string, id?: string, todo?: Todo) => void,
    deleteFunction: (todo: Todo) => void,
    putFunction: (todo: Todo) => void,
    progressFunction: (todo: Todo) => void
}

export default function TodoItem(props: TodoProps) {
    return (
        <div className={"TodoItem"}>
            <h3>{props.todo.description}</h3>
            <div className={"ButtonBar"}>
                <button type={"button"} id={"details"} className={"ButtonBarItem"} onClick={() => props.changeModeFunction("detail", props.todo.id)}>Details</button>
                <button type={"button"} id={"edit"} className={"ButtonBarItem"} onClick={() => props.changeModeFunction("edit", props.todo.id, props.todo)}>Edit</button>
                <button type={"button"} id={"progress"} className={"ButtonBarItem"} onClick={() => props.todo.status === "DONE" ? props.deleteFunction(props.todo) : props.progressFunction(props.todo)}>
                    {props.todo.status === "DONE" ? "Delete": "Progress"}
                </button>
            </div>
        </div>
    )
}