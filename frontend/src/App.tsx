import React, {useContext} from 'react';
import './App.css';
import NavigationBar from "./NavigationBar";
import TodoGallery from "./TodoGallery";
import DetailView from "./DetailView";
import StatusView from "./StatusView";
import AddBar from "./AddBar";
import EditView from "./EditView";
import {RequestFunctions} from "./ContextTodo";


function App() {

    const context = useContext(RequestFunctions)

    return (
        <div className="App">
                <header className="App-header">
                    <h1> Todo App</h1>
                    <NavigationBar mode={context.mode}/>
                </header>
                {
                    context.mode.toLowerCase() === "overview"
                    &&
                    <TodoGallery todos={context.allTodos} />
                }
                {
                    context.mode.toLowerCase() === "detail"
                    && context.currentTodo.id !== ""
                    && <DetailView todo={context.currentTodo} />
                }
                {
                    context.mode.toLowerCase() === "edit"
                    && context.currentTodo.id !== ""
                    && <EditView todo={context.currentTodo} />
                }
                {
                    (
                        context.mode.toLowerCase() === "open"
                        || context.mode.toLowerCase() === "in_progress"
                        || context.mode.toLowerCase() === "done"
                    )
                    && <StatusView todos={context.allTodos} mode={context.mode} />
                }
                <AddBar />
        </div>
    )
        ;
}

export default App;
