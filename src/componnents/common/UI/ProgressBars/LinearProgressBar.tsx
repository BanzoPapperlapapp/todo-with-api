import React from 'react';
import style from './LinearProgressBar.module.css'

export const LinearProgressBar = () => {

     return  (
         <div className={style.progressBar}>
                    <span className={`${style.bar} ${style.span}`}>
                        <span className={`${style.progress} ${style.span}`}></span>
                    </span>
         </div>
     )

}