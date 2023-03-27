import {useState} from "react";

type AddBarProps = {addFunction: (desc: string) => void}

export default function AddBar(props: AddBarProps) {
    const [description, setDescription] = useState("")
    return (
        <div className={"AddBar"}>
            <input type={"text"} placeholder={"Type in a description of your task"} onChange={event => setDescription(event.target.value)}/>
            <button type={"button"} onClick={event => props.addFunction(description)}>Add</button>
        </div>
    )
}