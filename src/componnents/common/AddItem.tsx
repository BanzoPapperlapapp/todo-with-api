import React, {useState} from 'react';
import style from './AddItem.module.css'
type AddItemType = {
    title?: string
    addItem: ( title: string) => void
}
export const AddItem = ({title,addItem}:AddItemType) => {
    const [taskTitle,setTaskTitle] = useState('')
    const [error, setError] = useState('')
    const onClickAddItemHandler = () => {
        if(taskTitle.trim()) {
            addItem(taskTitle)
            setTaskTitle('')
            setError('')
        } else {
            setError('Название не может пустым')
        }
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const inputStyle = error ? style.errorInputColor : style.inputColor
    return (
        <div className={style.container}>
            {title && <div>
                <h3>
                    {title}
                </h3>
            </div>
            }
            <input
                className={inputStyle}
                type={"text"}
                value={taskTitle}
                onChange={onChangeHandler}
            />
            <button
                onClick={onClickAddItemHandler}
            >+
            </button>
            <div>
                <span className={style.errorSpan}>{error && error}</span>
            </div>
        </div>
    );
};