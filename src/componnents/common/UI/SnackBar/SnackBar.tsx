import React, {useEffect, useState} from 'react';
import style from './SnackBar.module.css'
import {AppReducerStateType} from "../../../../store/AppReducer";
import {useSelector} from "react-redux";
import {RootStateType} from "../../../../store/ReduxStore";

export const SnackBar = () => {
    const {error} = useSelector<RootStateType,AppReducerStateType>(state => state.app)
    const [visible, setVisible] = useState(!!error)

    useEffect(()=>{
        const id = setTimeout(()=>setVisible(false),3000)
        return ()=> clearTimeout(id)
    },[error])

    const finalSnackBarStyle = error
        ? `${style.snackbar} ${style.red}`
        : `${style.snackbar}`

    return  visible
        ?
        <div className={finalSnackBarStyle}><span>{error}</span></div>
        :
        <div className={`${finalSnackBarStyle} ${style.disable}`}></div>

};
