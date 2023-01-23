import React, {useState} from 'react';
import './App.css';
import {Todolists} from "./componnents/Todolists/Todolists";
import {useAppDispatch} from "./store/ReduxStore";
import {addTodoTC} from "./store/TodoReducer";

function App() {
    const [title,setTitle] = useState('')
    const dispatch = useAppDispatch()
    const addTodoHandler = () => {
        dispatch(addTodoTC(title))
    }
  return (
    <div className="App">
        <div className="AddItem">
            <input
                type={"text"}
                value={title}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
            />
            <button onClick={addTodoHandler}>+</button>
        </div>
        <Todolists/>
    </div>
  );
}

export default App;
