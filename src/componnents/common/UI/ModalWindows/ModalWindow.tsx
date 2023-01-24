import React, {useState} from 'react';
import style from './ModalWindow.module.css'
type ModalWindowType = {
    status: boolean
    setStatus: (status: boolean) => void
    children: React.ReactNode
}
export const ModalWindow = ({status,children, setStatus}:ModalWindowType) => {
    const finalStyle = status ? `${style.container} ${style.active}`: `${style.container}`
    const onClickSetActiveHandler = () => setStatus(!status)
    return <div
            className={finalStyle}
            onClick={()=> setStatus(false)}
        >
            <div
                className={style.content}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>

};
