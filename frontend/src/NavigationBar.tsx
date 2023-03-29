import {useContext} from "react";
import {RequestFunctions} from "./ContextTodo";
import {useNavigate, useParams} from "react-router-dom";

type NavigationBarProps = {mode: string}

export default function NavigationBar(props: NavigationBarProps) {

    const httpFunctions = useContext(RequestFunctions)
    const navigate = useNavigate()
    const {status} = useParams<{status: string}>()

    return (
        <div className={"NavigationBar"}>
            <div className={`NavigationItem ${status === "overview" && "selected"}`} id={"Overview"} onClick={() => navigate("/todo")}>Overview</div>
            <div className={`NavigationItem ${status === "open" && "selected"}`} id={"Open"} onClick={() => navigate("/todo/open")}>Open</div>
            <div className={`NavigationItem ${status === "in_progress" && "selected"}`} id={"InProgress"} onClick={() => navigate("/todo/in_progress")}>In Progress</div>
            <div className={`NavigationItem ${status === "done" && "selected"}`} id={"Done"} onClick={() => navigate("/todo/done")}>Done</div>
        </div>
    )
}