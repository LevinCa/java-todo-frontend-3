import {Todo} from "./Todo";
import TodoItem from "./TodoItem";

type StatusViewProps = {
    todos: Todo[] ,
    mode: string,
}

export default function StatusView(props: StatusViewProps) {
    return (
        <div className={"StatusView"}>
            <h2>{props.mode.toUpperCase().replace("_", " ")}</h2>
            {props.todos.filter(t => t.status === props.mode.toUpperCase())
                .map(t => {
                    return <TodoItem todo={t} />
                })}
        </div>
    )
}