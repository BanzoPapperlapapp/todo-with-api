import React, {useEffect} from 'react';
import style from './SnackBar.module.css'
import { setAppErrorAC} from "../../../../store/AppReducer";
import {useAppDispatch, useAppSelector} from "../../../../store/ReduxStore";

export const SnackBar = () => {
    const error = useAppSelector<null | string>(state => state.app.error)
    const dispatch = useAppDispatch()
    useEffect(()=>{
            const id = error?.length && setTimeout(()=> {
                dispatch(setAppErrorAC(null))
            },2000)
        return ()=> clearTimeout(id)
    },[error])

    const finalSnackBarStyle = error
        ? `${style.snackbar} ${style.red}`
        : `${style.snackbar}`

    return  error !== null
        ?
        <div className={finalSnackBarStyle}><span>{error}</span></div>
        :
        <div className={`${finalSnackBarStyle} ${style.disable}`}></div>

};
