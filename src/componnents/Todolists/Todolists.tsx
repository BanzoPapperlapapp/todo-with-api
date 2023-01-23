import React, {useEffect} from 'react';
import style  from './Todolists.module.css'
import {Todo} from "./Todo";
import {getTodosTC, TodoDomainType} from "../../store/TodoReducer";
import {useSelector} from "react-redux";
import {RootStateType, useAppDispatch} from "../../store/ReduxStore";
import {TaskDomainType} from "../../store/TaskReducer";


export const Todolists = () => {
    const todos = useSelector<RootStateType,TodoDomainType[]>(state => state.todos)
    const tasks = useSelector<RootStateType,TaskDomainType>(state => state.tasks)
    const dispatch = useAppDispatch()
    useEffect(()=> {
        dispatch(getTodosTC())
    },[])
    return (
        <div className={style.container}>
            {todos.map(t => <Todo
                key={t.id}
                tasks={tasks[t.id]}
                title={t.title}
                id={t.id}/>)}
        </div>
    );
};
