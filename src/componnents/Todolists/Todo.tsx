import React, {useEffect, useState} from "react";
import {TaskApiStatuses, TaskApiType} from "../../api/todolistApi";
import style from './Todo.module.css'
import {useAppDispatch} from "../../store/ReduxStore";
import {
    addTaskTC,
    changeTaskStatusAC,
    changeTaskStatusTC,
    changeTaskTitleTC,
    delTaskTC,
    getTasksTC
} from "../../store/TaskReducer";
import {changeTodoTC, delTodoTC} from "../../store/TodoReducer";
import {EditableSpan} from "../common/Editablespan";

type TodoPropsTypes = {
    title: string
    id: string
    tasks: TaskApiType[]
}
export const Todo = ({id, title, tasks}: TodoPropsTypes) => {
    const [isLoading, setIsLoading] = useState(true)
    const [taskTitle, setTaskTitle] = useState('')

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(id))
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    const delTodoHandler = () => dispatch(delTodoTC(id))

    const addTaskHandler = () => dispatch(addTaskTC(id, taskTitle))

    const delTaskHandler = (taskId: string) => dispatch(delTaskTC(id, taskId))

    const changeTaskStatusHandler = (e: React.ChangeEvent<HTMLInputElement>, taskId: string) => {
        const status = e.currentTarget.checked ? TaskApiStatuses.Completed : TaskApiStatuses.Now
        dispatch(changeTaskStatusTC(id, taskId, status))
    }
    const changeTodoTitle = (todoTitle: string) => dispatch(changeTodoTC(id, todoTitle))
    const changeTaskTitle = (title: string, taskId: string) => {
        dispatch(changeTaskTitleTC(id, taskId, title))
    }
    return (
        <div className={style.box}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left'
            }}>
                <div className={style.header}>
                    <input type={"text"} placeholder={"Поиск..."}/>
                    <button
                        className={style.btn}
                    >
                        <i className="fa fa-plus"></i>
                    </button>
                    <button
                        className={style.btn}
                        onClick={delTodoHandler}
                    ><i className="fa fa-trash"></i>
                    </button>
                </div>
            </div>
            <div className={style.todolistWrapper}>
                <h3>
                    <EditableSpan title={title} addItem={(todoTitle: string) => changeTodoTitle(todoTitle)}/>
                </h3>
                <div>
                    <input type={"text"} value={taskTitle}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)}/>
                    <button onClick={addTaskHandler}>+</button>
                </div>
                <ul className={style.list}>
                    {isLoading
                        ? <div className={style.loader}></div>
                        : tasks.length
                            ? tasks.map(t => <li
                                key={t.id}>
                                <input
                                    type={"checkbox"}
                                    checked={!!t.status}
                                    onChange={(e) => changeTaskStatusHandler(e, t.id)}
                                    style={{marginRight: '5px'}}/>
                                <span style={{marginRight: '5px'}}>
                                <EditableSpan
                                    title={t.title}
                                    addItem={(title: string) => changeTaskTitle(title, t.id)}
                                />
                            </span>
                                <button onClick={() => delTaskHandler(t.id)}>X</button>
                            </li>)
                            : <li><span>Empty</span></li>
                    }
                </ul>
            </div>
        </div>
    )
}