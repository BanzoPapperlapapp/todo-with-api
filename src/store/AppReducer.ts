import React from 'react';

type FinalActionType =
            | changeAppStatusACType
export type StatusAppType = 'loading' | 'resolve'

type AppReducerStateType = {
    status: StatusAppType
}
const initialAppReducerState:AppReducerStateType = {status: 'resolve'}
export const AppReducer = (state = initialAppReducerState, action: FinalActionType):AppReducerStateType => {
    switch (action.type){
        case "CHANGE-APP-STATUS": {
            return {...state,status: action.payload.status}
        }
        default: return state
    }
};

type changeAppStatusACType = ReturnType<typeof changeAppStatusAC>
export const changeAppStatusAC = (status: StatusAppType) => {
    return {type: 'CHANGE-APP-STATUS', payload: {status}} as const
}