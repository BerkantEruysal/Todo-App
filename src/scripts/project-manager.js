import uniqueIdGenerator from "./unique-id-generator"
import {getProjectFromId , getTodoFromId} from "./data-manager"
import { addToShowedProjectsList } from "./state-manager"
export const createProject = function(color , title) {
const projectObj = { color , title , todos = [] , isShowing = true , isDone = false}
projectObj.id = uniqueIdGenerator()
projectObj.priority = dataManager.projectList.length
}

export const editProject = function( project_id ,{color , title , isShowing , priority , isDone}) {
 const editedTodo = getProjectFromId(project_id);
 editedTodo.color = color;
 editedTodo.title = title;
 editedTodo.isShowing = isShowing;
 editedTodo.priority = priority;
 editedTodo.isDone = isDone;
}

export const doneProject = function(project_id) {
    getProjectFromId(project_id).isDone = true
}
export const undoneProject = function(project_id) {
    getProjectFromId(project_id).isDone = false
}

export const addTodo = function(todo , project_id){
    getProjectFromId(project_id).todos.push(todo)
}

export const removeTodo = function(project_id , todo_id) {
const project = getProjectFromId(project_id)
const indexOfTodo = project.todos.indexOf(getTodoFromId(todo_id))
project.todos = project.todos.splice(indexOfTodo , 1)
}

export const showProject = function(project_id){
    getProjectFromId(project_id).showedProject.isShowing = true;
    addToShowedProjectsList(project_id) 
}
