
type NavigationBarProps = { changeModeFunction: (newMode: string, id?: string) => void, mode: string}

export default function NavigationBar(props: NavigationBarProps) {
    return (
        <div className={"NavigationBar"}>
            <div className={`NavigationItem ${props.mode === "overview" && "selected"}`} id={"Overview"} onClick={event => props.changeModeFunction("overview")}>Overview</div>
            <div className={`NavigationItem ${props.mode === "open" && "selected"}`} id={"Open"} onClick={event => props.changeModeFunction("open")}>Open</div>
            <div className={`NavigationItem ${props.mode === "in_progress" && "selected"}`} id={"InProgress"} onClick={event => props.changeModeFunction("in_progress")}>In Progress</div>
            <div className={`NavigationItem ${props.mode === "done" && "selected"}`} id={"Done"} onClick={event => props.changeModeFunction("done")}>Done</div>
        </div>
    )
}