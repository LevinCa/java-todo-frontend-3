import {useContext} from "react";
import {RequestFunctions} from "./ContextTodo";
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";

type NavigationBarProps = {mode: string}

export default function NavigationBar(props: NavigationBarProps) {

    return (
        <div className={"NavigationBar"}>
            <NavLink className={"NavigationItem"} id={"Overview"} to={"/todo"} end>Overview</NavLink>
            <NavLink className={"NavigationItem"} id={"Open"} to={"/todo/open"}>Open</NavLink>
            <NavLink className={"NavigationItem"} id={"InProgress"} to={"/todo/in_progress"}>In Progress</NavLink>
            <NavLink className={"NavigationItem"} id={"Done"} to={"/todo/done"}>Done</NavLink>
        </div>
    )
}