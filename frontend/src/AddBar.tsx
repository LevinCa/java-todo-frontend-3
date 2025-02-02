import {useContext, useState} from "react";
import {RequestFunctions} from "./ContextTodo";


export default function AddBar() {

    const [description, setDescription] = useState("")
    const httpFunctions = useContext(RequestFunctions)

    return (
        <div className={"AddBar"}>
            <input type={"text"} placeholder={"Type in a description of your task"} onChange={event => setDescription(event.target.value)}/>
            <button type={"button"} onClick={() => httpFunctions.post(description)}>Add</button>
        </div>
    )
}