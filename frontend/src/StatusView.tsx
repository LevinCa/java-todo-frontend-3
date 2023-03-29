import {Todo} from "./Todo";
import TodoItem from "./TodoItem";
import {useParams} from "react-router-dom";

type StatusViewProps = {
    todos: Todo[] ,
    mode: string,
}

export default function StatusView(props: StatusViewProps) {

    const {status} = useParams<{status: string}>()

    return (
        <div className={"StatusView"}>
            <h2>{status?.toUpperCase().replace("_", " ")}</h2>
            {props.todos.filter(t => t.status === status?.toUpperCase())
                .map(t => {
                    return <TodoItem todo={t} />
                })}
        </div>
    )
}