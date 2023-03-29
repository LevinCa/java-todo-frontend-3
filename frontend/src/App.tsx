import React, {useContext} from 'react';
import './App.css';
import NavigationBar from "./NavigationBar";
import TodoGallery from "./TodoGallery";
import DetailView from "./DetailView";
import StatusView from "./StatusView";
import AddBar from "./AddBar";
import EditView from "./EditView";
import {RequestFunctions} from "./ContextTodo";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {

    const context = useContext(RequestFunctions)

    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <h1> Todo App</h1>
                    <NavigationBar mode={context.mode}/>
                </header>
            </div>
            <Routes>
                <Route path={"/todo"}>
                    <Route index element={
                        <div>
                            <TodoGallery todos={context.allTodos}/>
                            <AddBar/>
                        </div>
                    }/>
                    <Route path={"detail/:id"} element={
                        <DetailView todo={context.currentTodo}/>
                    }/>
                    <Route path={"edit/:id"} element={
                        <EditView todo={context.currentTodo}/>
                    }/>
                    <Route path={":status"} element={
                        <StatusView todos={context.allTodos} mode={context.mode}/>
                    }/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
