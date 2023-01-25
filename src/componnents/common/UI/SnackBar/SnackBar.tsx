import React, {useEffect, useState} from 'react';
import style from './SnackBar.module.css'
type SnackBarType = {
    error?: boolean
    title: string
}
export const SnackBar = ({error = false, title}: SnackBarType) => {
    const [visible, setVisible] = useState(true)
    useEffect(()=>{
        const id = setTimeout(()=>setVisible(false),3000)
        return () => clearTimeout(id)
    },[title])

    const finalSnackBarStyle = error
        ? `${style.snackbar} ${style.red}`
        : `${style.snackbar}`

    return  visible
        ?
        <div className={finalSnackBarStyle}><span>{title}</span></div>
        :
        <div className={`${finalSnackBarStyle} ${style.disable}`}></div>

};
