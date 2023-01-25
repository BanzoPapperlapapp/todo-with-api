import React from 'react';
import style from './LinearProgressBar.module.css'
import {StatusAppType} from "../../../../store/AppReducer";

type LinearProgressBarType = {
    status: StatusAppType
}
export const LinearProgressBar = ({status}: LinearProgressBarType) => {

    return status === 'loading'
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