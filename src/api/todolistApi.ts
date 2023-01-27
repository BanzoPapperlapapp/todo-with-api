import axios from 'axios'
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '4d930de1-8cb2-436a-8a88-6a8f5582290e'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodoApiType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export enum TaskApiStatuses {
    Now,
    Active,
    Completed
}
export type TaskApiType = {
    description: string
    title: string
    status: TaskApiStatuses
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskApiType = {
    title: string
    description: string
    status: TaskApiStatuses
    priority: number
    startDate: string
    deadline: string
}
type GetTasksResponseType = {
    items: TaskApiType[]
    totalCount: number
    error: string | null

}
type addTaskResponseType = {
    item: TaskApiType
}
type addTodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type addTodoResponseType = {
    item: addTodoType
}
export type TodoApiResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: string[]
}
export const todoApi = {
    getTodos (){
        return instance.get<TodoApiType[]>('todo-lists')
    },
    addTodo(title: string){
        return instance.post<TodoApiResponseType<addTodoResponseType>>('todo-lists',{title})
    },
    delTodo(todoId: string){
        return instance.delete<TodoApiResponseType>(`todo-lists/${todoId}`)
    },
    updateTodo(todoId: string, title: string){
        return instance.put(`todo-lists/${todoId}`,{title})
    },
    getTasks(todoId: string){
        return instance.get<GetTasksResponseType>(`todo-lists/${todoId}/tasks`)
    },
    addTask(todoId: string, title: string){
        return instance.post<TodoApiResponseType<addTaskResponseType>>(`todo-lists/${todoId}/tasks`,{title})
    },
    delTask(todoId: string, taskId: string) {
        return instance.delete<TodoApiResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTask(todoId: string, taskId: string, task: UpdateTaskApiType) {
        return instance.put<TodoApiResponseType>(`todo-lists/${todoId}/tasks/${taskId}`,{...task})
    }
}
