import {TaskApiStatuses, TaskApiType, todoApi, UpdateTaskApiType} from "../api/todolistApi";
import {Dispatch} from "redux";
import {RootStateType} from "./ReduxStore";
import {addTodoAC, delTodoAC} from "./TodoReducer";
import {setAppStatusAC} from "./AppReducer";

const initialState: TaskDomainType = {}

export const TaskReducer = (state = initialState, action: TaskReducerUnionActionType): TaskDomainType => {
    switch (action.type) {
        case "SET-TASKS": {
            const tempState = {...state}
            tempState[action.payload.id] = action.payload.tasks
            return tempState
        }
        case "ADD-TASK": {
            return {...state, [action.payload.todoId]: [action.payload.task, ...state[action.payload.todoId]]}
        }
        case "DEL-TASK": {
            return {...state,[action.payload.todoId]: state[action.payload.todoId].filter(t => t.id !== action.payload.taskId)}
        }
        case "CHANGE-TASK-STATUS": {
            return {...state,
                [action.payload.todoId]: state[action.payload.todoId]
                    .map(t => t.id === action.payload.taskId ? {...t,status: action.payload.status} : t)}
        }
        case "ADD-TODO": {
            return {...state,[action.payload.todo.id] : []}
        }
        case "DEL-TODO": {
            const tempState = {...state}
            delete tempState[action.payload.todoId]
            return tempState
        }
        case "CHANGE-TASK-TITLE": {
            return {...state,
                [action.payload.todoId]: state[action.payload.todoId]
                    .map(t => t.id === action.payload.taskId ? {...t,title: action.payload.title} : t)}
        }
        default:
            return state
    }
}

/****************************************************************/
/*********************Thunk Creators*****************************/
/****************************************************************/
export const getTasksTC = (todoId: string) => {
    return (dispatch: Dispatch) => {
        todoApi.getTasks(todoId)
            .then(res => {
                dispatch(setTasksAC(todoId, res.data.items))
            })
    }
}
export const addTaskTC = (todoId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoApi.addTask(todoId, title)
            .then(res => dispatch(addTasksAC(todoId, res.data.data.item)))
    }
}
export const delTaskTC = (todoId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todoApi.delTask(todoId, taskId)
            .then(() => dispatch(delTaskAC(todoId, taskId)) )
    }
}
export const changeTaskStatusTC = (todoId: string, taskId: string, status: TaskApiStatuses) => {
    return (dispatch: Dispatch, getState: () => RootStateType) => {
        const task = getState().tasks[todoId].find(t => t.id === taskId)
        if(!task) return
        const newTask:UpdateTaskApiType = {
            description: task.description,
            title: task.title,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            status: status}
        todoApi.updateTask(todoId,taskId,newTask)
            .then(() => dispatch(changeTaskStatusAC(todoId,taskId,newTask.status)))
    }
}
export const changeTaskTitleTC = (todoId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch, getState: () => RootStateType) => {
        const task = getState().tasks[todoId].find(t => t.id === taskId)
        if(!task) return;
        const newTask:UpdateTaskApiType = {
            description: task.description,
            title: title,
            deadline: task.deadline,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status}
        todoApi.updateTask(todoId,taskId,newTask)
            .then(() => dispatch(changeTaskTitleAc(todoId,taskId,title)))
    }
}
/****************************************************************/
/*********************Action Creators****************************/
/****************************************************************/
export const setTasksAC = (id: string, tasks: TaskApiType[]) => {
    return {type: 'SET-TASKS', payload: {id, tasks}} as const
}
export const addTasksAC = (todoId: string, task: TaskApiType) => {
    return {type: 'ADD-TASK', payload: {todoId, task}} as const
}
export const delTaskAC = (todoId: string, taskId: string) => {
    return {type: 'DEL-TASK', payload: {todoId, taskId}} as const
}
export const changeTaskStatusAC = (todoId: string, taskId: string, status: TaskApiStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todoId, taskId , status}} as const
}
export const changeTaskTitleAc = (todoId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {todoId, taskId, title}} as const
}
/****************************************************************/
/*********************TYPES**************************************/
/****************************************************************/
export type TaskDomainType = {
    [key: string]: TaskApiType[]
}

type TaskReducerUnionActionType =
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTasksAC>
    | ReturnType<typeof delTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof delTodoAC>
    | ReturnType<typeof changeTaskTitleAc>