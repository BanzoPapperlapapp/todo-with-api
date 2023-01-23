import React, {useState} from 'react';

type EditableSpanType = {
    title: string,
    addItem(title: string): void
}
export const EditableSpan = ({title, addItem}: EditableSpanType) => {
    const [isEdit, setIsEdit] = useState(false)
    const [inputTitle, setInputTitle] = useState('')
    const onBlurSaveTitleHandler = () => {
            addItem(inputTitle)
            setIsEdit(false)
    }
    const onDoubleClickEnableInputHandler = () => {
        console.log(title)
        setInputTitle(title)
        setIsEdit(true)
    }
    const onChangeInputHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
       e.currentTarget.value.trim() && setInputTitle(e.currentTarget.value)
    }
    return (
        <>
            {isEdit
                ? <textarea
                    style={{width: '150px',height: '25px',resize: 'none',fontSize: '1.17em',fontWeight: 'bold'}}
                    autoFocus
                    value={inputTitle}
                    onBlur={onBlurSaveTitleHandler}
                    onChange={onChangeInputHandler}
                />
                : <span
                    onDoubleClick={onDoubleClickEnableInputHandler}
                >{title}</span>
            }
        </>
    );
};
