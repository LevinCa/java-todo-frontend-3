import {Todo} from "./Todo";
import {useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {RequestFunctions} from "./ContextTodo";

type DetailViewProps = {todo: Todo}

export default function DetailView(props: DetailViewProps) {

    const {id} = useParams<{id: string}>()
    const httpFunctions = useContext(RequestFunctions)

    useEffect(() => {
        if (id) httpFunctions.getById(id)
    }, [])

    return (
        <div className={"DetailView"}>
            <div className={"PropertyContainer"}>
                <label htmlFor={"id"}>ID: </label>
                <p id={"id"}>{props.todo.id}</p>
            </div>
            <div className={"PropertyContainer"}>
                <label htmlFor={"description"}>Description: </label>
                <p id={"description"}>{props.todo.description}</p>
            </div>
            <div className={"PropertyContainer"}>
                <label htmlFor={"status"}>Status: </label>
                <p id={"status"}>{props.todo.status}</p>
            </div>
        </div>
    )
}