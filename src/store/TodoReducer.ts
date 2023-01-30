import {todoApi, TodoApiType} from "../api/todolistApi";
import {Dispatch} from "redux";
import {setAppStatusAC, setAppErrorAC} from "./AppReducer";
import {getTasksTC} from "./TaskReducer";
import {AppThunk} from "./ReduxStore";
import axios from "axios";


const initialState: TodoDomainType[] = []
export const TodoReducer = (state = initialState, action: TodoReducerUnionActionType): TodoDomainType[] => {
    switch (action.type) {
        case "GET-TODOS": {
            return action.payload.todos.map(t => ({...t, filter: 'all'}))
        }
        case "ADD-TODO": {
            return [action.payload.todo, ...state]
        }
        case "DEL-TODO": {
            return state.filter(t => t.id !== action.payload.todoId)
        }
        case "CHANGE-TODO-TITLE": {
            return state.map(t => t.id === action.payload.todoId ? {...t, title: action.payload.title} : t)
        }
        default:
            return state;
    }
}
/****************************************************************/
/*********************Future Function*****************************/
/****************************************************************/
function errorHandler(dispatch: Dispatch, err?: string[] | string) {
    const error = typeof err === 'object' ? err[0] : err
    dispatch(setAppErrorAC(error ? error : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}
/****************************************************************/
/*********************Thunk Creators*****************************/
/****************************************************************/
export const addTodoTC = (title: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC('pending'))
            const todo = await todoApi.addTodo(title)

            if (todo.data.resultCode === 0) {
                dispatch(setAppStatusAC('idle'))
                const newTodo: TodoDomainType = {...todo.data.data.item, filter: 'all'}
                dispatch(addTodoAC(newTodo))
            } else {
                errorHandler(dispatch, todo.data.messages)
            }
        } catch (e: unknown) {
            axios.isAxiosError(e) && errorHandler(dispatch, e.response?.data ? e.response.data.map : e.message)
        }
    }
}
export const getTodosTC = (): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const todos = await todoApi.getTodos()
            dispatch(getTodosAC(todos.data))
            todos.data.forEach(el => dispatch(getTasksTC(el.id)))
            dispatch(setAppStatusAC('idle'))
        } catch (e: unknown) {
            axios.isAxiosError(e) && errorHandler(dispatch, e.response?.data ? e.response.data.map : e.message)
        }

    }
}
export const delTodoTC = (todoId: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC('pending'))
            const res = (await todoApi.delTodo(todoId)).data
            if (res.resultCode === 0) {
                dispatch(delTodoAC(todoId))
                dispatch(setAppStatusAC('idle'))
            } else {
                errorHandler(dispatch, res.messages)
            }
        } catch (e: unknown) {
            axios.isAxiosError(e) && errorHandler(dispatch, e.response?.data ? e.response.data.map : e.message)
        }
    }
}
export const updateTodoTC = (todoId: string, title: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC('pending'))
            const res = (await todoApi.updateTodo(todoId, title)).data
            if (res.resultCode === 0) {
                dispatch(changeTodoTitleAC(todoId, title))
                dispatch(setAppStatusAC('idle'))
            } else {
                errorHandler(dispatch, res.messages)
            }
        } catch (e: unknown) {
            axios.isAxiosError(e) && errorHandler(dispatch, e.response?.data ? e.response.data.map : e.message)
        }

    }
}
/****************************************************************/
/*********************Action Creators****************************/
/****************************************************************/
export const getTodosAC = (todos: TodoApiType[]) => {
    return {type: 'GET-TODOS', payload: {todos}} as const
}
export const addTodoAC = (todo: TodoDomainType) => {
    return {type: 'ADD-TODO', payload: {todo}} as const
}
export const delTodoAC = (todoId: string) => {
    return {type: 'DEL-TODO', payload: {todoId}} as const
}
export const changeTodoTitleAC = (todoId: string, title: string) => {
    return {type: 'CHANGE-TODO-TITLE', payload: {todoId, title}} as const
}
/****************************************************************/
/*********************TYPES**************************************/
/****************************************************************/
export type TodoDomainFilterType = 'all' | 'completed' | 'active'

export type TodoDomainType = TodoApiType & {
    filter: TodoDomainFilterType
}
export type TodoReducerUnionActionType =
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof getTodosAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof delTodoAC>
    | ReturnType<typeof changeTodoTitleAC>



