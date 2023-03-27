import {Todo} from "./Todo";
import TodoItem from "./TodoItem";

type GalleryProps = {
    todos: Todo[],
    changeModeFunction: (newMode: string, id?: string) => void,
    deleteFunction: (todo: Todo) => void,
    putFunction: (todo: Todo) => void,
    progressFunction: (todo: Todo) => void
}

export default function TodoGallery(props: GalleryProps) {
    return (
        <div className={"TodoGallery"}>
            <div id={"OpenContainer"} className={"GalleryContainer"}>
                <h2>Open</h2>
                <div className={"ItemContainer"}>
                    {props.todos.filter(t => t.status === "OPEN").map(t => {
                        console.log(t)
                        return <TodoItem todo={t} changeModeFunction={props.changeModeFunction} deleteFunction={props.deleteFunction} putFunction={props.putFunction} progressFunction={props.progressFunction}/>
                    })}
                </div>
            </div>
            <div id={"InProgressContainer"} className={"GalleryContainer"}>
                <h2>In Progress</h2>
                <div className={"ItemContainer"}>
                    {props.todos.filter(t => t.status === "IN_PROGRESS").map(t => {
                        return <TodoItem todo={t} changeModeFunction={props.changeModeFunction} deleteFunction={props.deleteFunction} putFunction={props.putFunction} progressFunction={props.progressFunction}/>
                    })}
                </div>
            </div>
            <div id={"DoneContainer"} className={"GalleryContainer"}>
                <h2>Done</h2>
                <div className={"ItemContainer"}>
                    {props.todos.filter(t => t.status === "DONE").map(t => {
                        return <TodoItem todo={t} changeModeFunction={props.changeModeFunction} deleteFunction={props.deleteFunction} putFunction={props.putFunction} progressFunction={props.progressFunction}/>
                    })}
                </div>
            </div>
        </div>
    )
}