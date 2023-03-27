import {Todo} from "./Todo";
import TodoItem from "./TodoItem";

type StatusViewProps = {
    todos: Todo[] ,
    mode: string,
    changeModeFunction: (mode: string, id?: string) => void,
    putFunction: (todo: Todo) => void,
    deleteFunction: (todo: Todo) => void,
    progressFunction: (todo: Todo) => void
}

export default function StatusView(props: StatusViewProps) {
    return (
        <div className={"StatusView"}>
            <h2>{props.mode.toUpperCase().replace("_", " ")}</h2>
            {props.todos.filter(t => t.status === props.mode.toUpperCase())
                .map(t => {
                    return <TodoItem todo={t} changeModeFunction={props.changeModeFunction} deleteFunction={props.deleteFunction} progressFunction={props.progressFunction} putFunction={props.putFunction}/>
                })}
        </div>
    )
}