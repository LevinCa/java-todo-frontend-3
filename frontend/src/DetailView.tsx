import {Todo} from "./Todo";

type DetailViewProps = {todo: Todo}

export default function DetailView(props: DetailViewProps) {
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