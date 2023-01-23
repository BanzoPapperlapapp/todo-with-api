import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TodoReducer} from "./TodoReducer";
import thunk, {ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";
import {TaskReducer} from "./TaskReducer";

export type RootReducerType = ReturnType<typeof RootReducer>
const RootReducer = combineReducers({
    todos: TodoReducer,
    tasks: TaskReducer
})
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, undefined, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch

export const store = createStore(RootReducer,applyMiddleware(thunk))