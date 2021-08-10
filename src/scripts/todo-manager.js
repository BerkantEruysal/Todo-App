import uniqueIdGenerator from "./unique-id-generator"
import {getTodoFromId} from "./data-manager"
export const createTodo = function(project_id, title , deadline , description ) {
    const todoObj = {project_id , title , deadline , description , isDone = false}
    todoObj.color = dataManager.getProjectFromId(project_id).color
    todoObj.priority = dataManager.getProjectFromId(project_id).todoList.length
    todoObj.id = uniqueIdGenerator()

    return todoObj;
}


export const doneTodo = function(todo_id) {
    getTodoFromId(todo_id).isDone = true;
}
export const unDoneTodo = function(todo_id) {
    getTodoFromId(todo_id).isDone = false;
}


export const editTodo = function(todo_id , {project_id , title , deadline , description, isDone, color, priority}) {
    const editedTodo = dataManager.getTodoFromId(todo_id)
    editedTodo.project_id = project_id;
    editedTodo.title = title;
    editedTodo.deadline = deadline;
    editedTodo.description = description;
    editedTodo.isDone = isDone;
    editedTodo.color = color;
    editedTodo.priority = priority;
}
