import React, {useEffect} from 'react';
import './App.css';
import {Todolists} from "./componnents/Todolists/Todolists";
import { useAppDispatch, useAppSelector} from "./store/ReduxStore";
import {addTodoTC, getTodosTC} from "./store/TodoReducer";
import {AddItem} from "./componnents/common/AddItem";
import {LinearProgressBar} from "./componnents/common/UI/ProgressBars/LinearProgressBar";
import {StatusAppType} from "./store/AppReducer";
import {SnackBar} from "./componnents/common/UI/SnackBar/SnackBar";

function App() {
    const status = useAppSelector<StatusAppType>(state => state.app.status)
    // const status = 'idle'
    const dispatch = useAppDispatch()
    console.log('App rerender')


    const addTodoHandler = (title: string) => dispatch(addTodoTC(title))

    return (
            <div className="App">
                {status === 'pending'
                    ?
                    <LinearProgressBar/>
                    :
                    <div style={{height: '2px'}}></div>
                }
                    <div className="AppWrapper">
                        <div className="AddItem">
                            <AddItem addItem={addTodoHandler}/>
                        </div>
                        <Todolists/>
                     </div>
                    <SnackBar/>
            </div>
    );
}

export default App;
