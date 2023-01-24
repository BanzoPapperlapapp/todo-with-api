import React from 'react';
import style from './CircleProgressBar.module.css'
type CircleProgressBarType = {
    status: boolean
}
export const CircleProgressBar = () => {
    return <div className={style.loader}></div>
};

