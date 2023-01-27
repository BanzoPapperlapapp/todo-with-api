import React, {useEffect} from 'react';
import style from './ModalWindow.module.css'

type ModalWindowType = {
    status: boolean
    setStatus: (status: boolean) => void
    children: React.ReactNode
}
export const ModalWindow = ({status, children, setStatus}: ModalWindowType) => {
    useEffect(() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.code === 'Escape') {
                setStatus(false)
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [])

    const finalStyle = status ? `${style.container} ${style.active}` : `${style.container}`
    const onKeyDownEsc = (e: React.KeyboardEvent) => console.log(e.key)
    return (
        <div className={finalStyle} onClick={() => setStatus(false)}>
            <div
                className={style.content}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                onKeyDown={onKeyDownEsc}
            >
                {children}
            </div>
        </div>
    )

};
