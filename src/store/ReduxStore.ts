import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TodoReducer} from "./TodoReducer";
import thunk, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {TaskReducer} from "./TaskReducer";
import {AppReducer} from "./AppReducer";

export type RootReducerType = ReturnType<typeof RootReducer>
const RootReducer = combineReducers({
    todos: TodoReducer,
    tasks: TaskReducer,
    app: AppReducer
})
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, undefined, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
export const store = createStore(RootReducer,applyMiddleware(thunk))