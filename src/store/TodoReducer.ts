import {todoApi, TodoApiType} from "../api/todolistApi";
import {Dispatch} from "redux";
import {changeAppStatusAC, setAppErrorAC} from "./AppReducer";


export type TodoDomainFilterType = 'all' | 'completed' | 'active'

export type TodoDomainType = TodoApiType & {
    filter: TodoDomainFilterType
}
export type TodoReducerUnionActionType =
    | GetTodosACType
    | AddTodoACType
    | DelTodoACType
    | ChangeTodoTitleACType
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

type GetTodosACType = ReturnType<typeof getTodosAC>
export const getTodosAC = (todos: TodoApiType[]) => {
    return {type: 'GET-TODOS', payload: {todos}} as const
}
export type AddTodoACType = ReturnType<typeof addTodoAC>
export const addTodoAC = (todo: TodoDomainType) => {
    return {type: 'ADD-TODO', payload: {todo}} as const
}
export type DelTodoACType = ReturnType<typeof delTodoAC>
export const delTodoAC = (todoId: string) => {
    return {type: 'DEL-TODO', payload: {todoId}} as const
}
export type ChangeTodoTitleACType = ReturnType<typeof changeTodoTitleAC>
export const changeTodoTitleAC = (todoId: string, title: string) => {
    return {type: 'CHANGE-TODO-TITLE', payload: {todoId, title}} as const
}
export const addTodoTC = (title: string) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(changeAppStatusAC('loading'))
            const todo = await todoApi.addTodo(title)

            if (todo.data.resultCode === 0) {
                dispatch(changeAppStatusAC('resolve'))
                const newTodo: TodoDomainType = {...todo.data.data.item, filter: 'all'}
                dispatch(addTodoAC(newTodo))
            } else {
                todo.data.messages.length
                    ? dispatch(setAppErrorAC(todo.data.messages[0]))
                    : dispatch(setAppErrorAC('Some error occurred'))
                dispatch(changeAppStatusAC('failed'))
            }
        } catch (e: unknown) {
            console.log((e as Error).message)
        }
    }
}
export const getTodosTC = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(changeAppStatusAC('loading'))
            const todos = await todoApi.getTodos()
            dispatch(getTodosAC(todos.data))
            dispatch(changeAppStatusAC('resolve'))
        } catch (e) {
            console.log((e as Error).message)
            dispatch(setAppErrorAC((e as Error).message))
        }

    }
}
export const delTodoTC = (todoId: string) => {
    return async (dispatch: Dispatch) => {
        try {
            // dispatch(changeAppStatusAC('loading'))
            const res = await todoApi.delTodo(todoId)
            // dispatch(changeAppStatusAC('resolve'))
            dispatch(delTodoAC(todoId))
        } catch (e) {
            console.log(e)
            dispatch(setAppErrorAC((e as Error).message))
        }
    }
}
export const changeTodoTC = (todoId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoApi.updateTodo(todoId, title)
            .then(() => dispatch(changeTodoTitleAC(todoId, title)))
    }
}