import React from 'react';
import style from './LinearProgressBar.module.css'

type LinearProgressBarType = {
    status: boolean
}
export const LinearProgressBar = ({status}: LinearProgressBarType) => {

    return status
                ?
                <div className={style.progressBar}>
                <span className={`${style.bar} ${style.span}`}>
                    <span className={`${style.progress} ${style.span}`}></span>
                </span>
                </div>
                :
                <div style={{
                    height: '2px'
                }}>
                </div>

};