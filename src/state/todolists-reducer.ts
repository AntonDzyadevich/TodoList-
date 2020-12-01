import {TodoListType, FilterValuesType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValuesType
    id: string
}

export type ActionType = ChangeTodolistFilterActionType |
    ChangeTodolistTitleActionType |
    AddTodolistActionType |
    RemoveTodolistActionType


export const todoListsReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            let todoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: "all"
            }
            return [...state, todoList]

        case 'CHANGE-TODOLIST-TITLE':
        {
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return state
        }


        case 'CHANGE-TODOLIST-FILTER':
        {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...state]
            }
            return state
        }

        default:
            throw new Error("I don't understand this type")
    }
}



export const RemoveTodoListAC = (todoListId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todoListId}
}
export const AddTodoListAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodoListTitleAC = (title: string, id:string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE',
            id: id,
            title: title}
}
export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}