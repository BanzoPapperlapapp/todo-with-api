import React, {useState} from 'react';
import './App.css';
import {Todolists} from "./componnents/Todolists/Todolists";
import {useAppDispatch} from "./store/ReduxStore";
import {addTodoTC} from "./store/TodoReducer";
import {AddItem} from "./componnents/common/AddItem";

function App() {
    const dispatch = useAppDispatch()
    const addTodoHandler = (title: string) => {
        dispatch(addTodoTC(title))
    }
  return (
    <div className="App">

        <div className="AddItem">
            <AddItem addItem={addTodoHandler}/>
        </div>
        <Todolists/>
    </div>
  );
}

export default App;
