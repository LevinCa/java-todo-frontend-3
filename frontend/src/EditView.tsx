import {Todo} from "./Todo";
import {useContext, useState} from "react";
import {RequestFunctions} from "./ContextTodo";

type EditViewProps = {
    todo: Todo,
}

export default function EditView(props: EditViewProps) {

    const [updatedTodo, setUpdatedTodo] = useState<Todo>(props.todo)
    const httpFunctions = useContext(RequestFunctions)

    return (
        <div className={"EditView"}>
                <div className={"EditField"}>
                    <label htmlFor={"idEdit"}>ID: </label>
                    <p id={"idEdit"}>{updatedTodo.id}</p>
                </div>
                <div className={"EditField"}>
                    <label htmlFor={"descriptionEdit"}>Description: </label>
                    <input id={"descriptionEdit"} type={"text"} value={updatedTodo.description} onChange={event => setUpdatedTodo({...updatedTodo, description: event.target.value})}/>
                </div>
                <div className={"EditField"}>
                    <label htmlFor={"statusEdit"}>Status: </label>
                    <select id={"statusEdit"} defaultValue={updatedTodo.status} onChange={event => setUpdatedTodo({...updatedTodo, status: event.target.value})}>
                        <option value={"OPEN"}>Open</option>
                        <option value={"IN_PROGRESS"}>In Progress</option>
                        <option value={"DONE"}>Done</option>
                    </select>
                </div>
            <button type={"button"} onClick={() => {httpFunctions.put(updatedTodo); httpFunctions.change("overview", "" , updatedTodo)}}>Save</button>
        </div>
    )
}