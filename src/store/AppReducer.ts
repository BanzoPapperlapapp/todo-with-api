const initialAppReducerState:AppReducerStateType = {status: 'loading', error: null}
export const AppReducer = (state = initialAppReducerState, action: FinalActionType):AppReducerStateType => {
    switch (action.type){
        case "CHANGE-APP-STATUS": {
            return {...state,status: action.payload.status}
        }
        case "SET-APP-ERROR": {
            return {...state,error: action.payload.error}
        }
        default: return state
    }
};

type changeAppStatusACType = ReturnType<typeof changeAppStatusAC>
export const changeAppStatusAC = (status: StatusAppType) => {
    return {type: 'CHANGE-APP-STATUS', payload: {status}} as const
}
type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => {
    return {type: 'SET-APP-ERROR', payload: {error}} as const
}

type FinalActionType =
    | changeAppStatusACType
    | setAppErrorACType

export type StatusAppType = 'loading' | 'resolve'

export type AppReducerStateType = {
    status: StatusAppType
    error: string | null
}