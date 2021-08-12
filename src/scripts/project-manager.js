import uniqueIdGenerator from "./unique-id-generator.js"
import {getProjectById , getTodoById , getProjectList} from "./data-manager.js"
import { addToShowedProjectsList } from "./state-manager.js"
export const createProject = function(color , title) {
const projectObj = { color , title , todos : [] , isVisible : true , isDone : false , isSelected : false}
projectObj.id = uniqueIdGenerator()
projectObj.priority = getProjectList().length
return projectObj
}

export const editProject = function( project_id ,{color , title , isVisible , priority , isDone}) {
 const editedTodo = getProjectById(project_id);
 editedTodo.color = color;
 editedTodo.title = title;
 editedTodo.isVisible = isVisible;
 editedTodo.priority = priority;
 editedTodo.isDone = isDone;
}

export const doneProject = function(project_id) {
    getProjectById(project_id).isDone = true
}
export const undoneProject = function(project_id) {
    getProjectById(project_id).isDone = false
}

export const addTodo = function(todo , project_id){
    getProjectById(project_id).todos.push(todo)
}

export const removeTodo = function(project_id , todo_id) {
const project = getProjectById(project_id)
const indexOfTodo = project.todos.indexOf(getTodoById(todo_id))
project.todos = project.todos.splice(indexOfTodo , 1)
}

export const showProject = function(project_id){
    getProjectById(project_id).showedProject.isVisible = true;
    addToShowedProjectsList(project_id) 
}
export const hideProject = function(project_id){
    getProjectById(project_id).showedProject.isVisible = false;
    removeFromShowedProjectsList(project_id) 
}
