import {useContext} from "react";
import {RequestFunctions} from "./App";

type NavigationBarProps = {mode: string}

export default function NavigationBar(props: NavigationBarProps) {

    const httpFunctions = useContext(RequestFunctions)

    return (
        <div className={"NavigationBar"}>
            <div className={`NavigationItem ${props.mode === "overview" && "selected"}`} id={"Overview"} onClick={event => httpFunctions.change("overview")}>Overview</div>
            <div className={`NavigationItem ${props.mode === "open" && "selected"}`} id={"Open"} onClick={event => httpFunctions.change("open")}>Open</div>
            <div className={`NavigationItem ${props.mode === "in_progress" && "selected"}`} id={"InProgress"} onClick={event => httpFunctions.change("in_progress")}>In Progress</div>
            <div className={`NavigationItem ${props.mode === "done" && "selected"}`} id={"Done"} onClick={event => httpFunctions.change("done")}>Done</div>
        </div>
    )
}