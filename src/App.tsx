import React, {useState} from 'react';
import './App.css';
import {Todolists} from "./componnents/Todolists/Todolists";
import {useAppDispatch} from "./store/ReduxStore";
import {addTodoTC} from "./store/TodoReducer";
import {AddItem} from "./componnents/common/AddItem";
import {LinearProgressBar} from "./componnents/common/UI/ProgressBars/LinearProgressBar";

function App() {
    const [status, setStatus] = useState(false)
    const dispatch = useAppDispatch()
    const addTodoHandler = (title: string) => {
        // dispatch(addTodoTC(title))
        setStatus(!status)
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
                </div>
            </div>
    );
}

export default App;
