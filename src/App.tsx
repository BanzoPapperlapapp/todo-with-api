import React, {useState} from 'react';
import './App.css';
import {Todolists} from "./componnents/Todolists/Todolists";
import {RootStateType, useAppDispatch} from "./store/ReduxStore";
import {addTodoTC} from "./store/TodoReducer";
import {AddItem} from "./componnents/common/AddItem";
import {LinearProgressBar} from "./componnents/common/UI/ProgressBars/LinearProgressBar";
import {useSelector} from "react-redux";
import {StatusAppType} from "./store/AppReducer";
import {SnackBar} from "./componnents/common/UI/SnackBar/SnackBar";

function App() {
    const status = useSelector<RootStateType,StatusAppType>(state => state.app.status)
    const dispatch = useAppDispatch()
    const addTodoHandler = (title: string) => {
        dispatch(addTodoTC(title))
    }
    return (
            <div className="App">
                    <LinearProgressBar
                    status={status}
                    />
                <div className="AppWrapper">
                    <div className="AddItem">
                        <AddItem addItem={addTodoHandler}/>
                    </div>
                    <Todolists/>
                    <SnackBar/>
                </div>
            </div>
    );
}

export default App;
