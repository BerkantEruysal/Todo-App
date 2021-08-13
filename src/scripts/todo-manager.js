import uniqueIdGenerator from "./unique-id-generator.js"
import {getTodoById , getProjectById} from "./data-manager.js"
export const createTodo = function(project_id, title , deadline , description ) {
    const todoObj = {project_id , title , deadline , description , isDone : false}
    todoObj.color = getProjectById(project_id).color
    todoObj.priority = getProjectById(project_id).todos.length
    todoObj.id = uniqueIdGenerator()


    return todoObj;
}


export const editTodo = function(todo_id , {project_id , title , deadline , description, isDone, color, priority}) {
    const editedTodo = getTodoById(todo_id)
    editedTodo.project_id = project_id;
    editedTodo.title = title;
    editedTodo.deadline = deadline;
    editedTodo.description = description;
    editedTodo.isDone = isDone;
    editedTodo.color = color;
    editedTodo.priority = priority;
}
