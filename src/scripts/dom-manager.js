import { addProjectToProjectList, getProjectById, getTodoById } from "./data-manager.js"
import { createTodo } from "./todo-manager.js"
import {removeTodo , addTodo , createProject} from "./project-manager.js"
import { getSelectedProject, setSelectedProject } from "./state-manager.js"
let _todoElementList = []
let _projectElementList = []
export const createTodoEl = function(todo_id){
    const createdTodo = getTodoById(todo_id)
    const elementContainer = document.createElement("div")
    const title = document.createElement("h4")
    const description = document.createElement("p")
    const date = document.createElement("p")
    const doneBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")

    title.innerHTML = createdTodo.title;
    description.innerHTML = createdTodo.description;
    date.innerHTML = createdTodo.deadline
    doneBtn.innerHTML = (createdTodo.isDone ? "undone" : "done")
    deleteBtn.innerHTML = "delete"

    deleteBtn.addEventListener("click" , () => deleteTodo(createdTodo))
    doneBtn.addEventListener("click" , () => doneTodo(createdTodo , elementContainer))

    elementContainer.className = "todo-item"
    elementContainer.id = createdTodo.id
    elementContainer.style.backgroundColor = createdTodo.color

    elementContainer.appendChild(title)
    elementContainer.appendChild(description)
    elementContainer.appendChild(date)
    elementContainer.appendChild(doneBtn)
    elementContainer.appendChild(deleteBtn)

     _todoElementList.push({elementContainer , title , description , date , doneBtn , id : todo_id})

    

}
const createProjectEl = function(project_id){
    const createdProject = getProjectById(project_id)
    const elementContainer = document.createElement("div")
    const title = document.createElement("h3")
    const totalTodos = document.createElement("p")
    const visibilityBtn = document.createElement("button")
    const deleteBtn = document.createElement("button")

    title.innerHTML = createdProject.title;
    totalTodos.innerHTML = `Todos in project : ${createdProject.todos.length}`
    visibilityBtn.innerHTML = (createdProject.isVisible ? "hide" : "show")
    deleteBtn.innerHTML = "Delete Proejct"
    elementContainer.style.backgroundColor = createdProject.color

    elementContainer.appendChild(title)
    elementContainer.appendChild(totalTodos)
    elementContainer.appendChild(visibilityBtn)
    elementContainer.appendChild(deleteBtn)

   _projectElementList.push({elementContainer , title , totalTodos , visibilityBtn , deleteBtn , id : project_id}) 
}
const removeTodoEl = function(todo_id){
    _todoElementList.splice(_todoElementList.indexOf(getTodoElementById(todo_id)), 1)
}
const removeProjectEl = function(project_id){
    _projectElementList.splice(_projectElementList.indexOf(getProjectElementById(project_id)) , 1)
}
export const refreshTodoElement = function(todo_id){
    const refreshedTodoElement = getTodoElementById(todo_id);
    const todo = getTodoById(todo_id)
    refreshedTodoElement.title.innerHTML = todo.title;
    refreshedTodoElement.description.innerHTML = todo.description;
    refreshedTodoElement.date.innerHTML = todo.deadline;
    refreshedTodoElement.doneBtn.innerHTML = (todo.isDone ? "undone" : "done")
}
export const refreshProjectElement = function(project_id){
    const refreshedProject = getProjectElementById(project_id);
    const project = getProjectById(project_id)
    refreshedProject.title.innerHTML = project.title;
    refreshedProject.totalTodos.innerHTML = `Todos in project : ${project.todos.length}`
    refreshedProject.visibilityBtn.innerHTML = (project.isVisible ? "hide" : "show")
    if(project.isSelected){refreshedProject.elementContainer.classList.add("selected-project")}else{refreshedProject.elementContainer.classList.remove("selected-project")}


}
const getTodoElementById = function(todo_id){
    let returnedTodo;
    _todoElementList.forEach(todo => {
        if(todo.id == todo_id){returnedTodo = todo}
    })
    return returnedTodo

}
const getProjectElementById = function(project_id){
    let returnedProject;
    _projectElementList.forEach(project => {
        if(project.id == project_id){returnedProject = project}
    })
    return returnedProject
}
const renderTodo = function(todo_id){
    const tdList = document.getElementById("td-list")
    tdList.appendChild(getTodoElementById(todo_id).elementContainer)
}
const renderProject = function(project_id){
    document.getElementById("project-list").appendChild(getProjectElementById(project_id).elementContainer)
}

const doneTodo = function(todo , elementContainer){
    todo.isDone = !todo.isDone
    if(todo.isDone == true){
        elementContainer.classList.add("done-todo")
    }else elementContainer.classList.remove("done-todo")
    refreshTodoElement(todo.id)

} 
const deleteTodo = function(todo){
    document.getElementById(todo.id).remove()
    removeTodoEl(todo.id);
    removeTodo(todo.project_id , todo.id)
}
const showTodoForm = function(){
    document.getElementById("todo-form").classList.remove("hidden")
}
const hideTodoForm = function(){
    document.getElementById("form-todo-title").value = ""
    document.getElementById("form-todo-description").value = ""
    document.getElementById("form-todo-date").value = ""
    document.getElementById("todo-form").classList.add("hidden")
}
const showProjectForm = function(){
    document.getElementById("project-form").classList.remove("hidden")
}
const hideProjectForm = function(){
    document.getElementById("form-project-title").value = ""
    document.getElementById("project-form").classList.add("hidden")
}

const selectProjectElement = function(project_id){
    const project = getProjectById(project_id)
    const projectElement = getProjectElementById(project_id)
    projectElement.elementContainer.classList.add("selected-project")
    
    const oldSelectedProject = getSelectedProject()
    setSelectedProject(project.id)
    refreshProjectElement(oldSelectedProject)
}

document.getElementById("form-todo-create").addEventListener("click" , (event) => {
    
    const title = document.getElementById("form-todo-title").value
    const description = document.getElementById("form-todo-description").value
    const date = document.getElementById("form-todo-date").value
    const todo = createTodo(getSelectedProject() , title , date , description)
    addTodo( todo , getSelectedProject())
    createTodoEl(todo.id)
    renderTodo(todo.id)
    refreshProjectElement(todo.project_id)



    hideTodoForm()

})

document.getElementById("form-todo-close").addEventListener("click" , () => hideTodoForm())

document.getElementById("create-todo").addEventListener("click" , () => showTodoForm())

document.getElementById("form-project-create").addEventListener("click" , () => {
    const title = document.getElementById("form-project-title").value
    const color = document.getElementById("form-project-color").value
    const project = createProject(color , title)
    addProjectToProjectList(project)
    createProjectEl(project.id)
    selectProjectElement(project.id)
    renderProject(project.id)
    hideProjectForm()



    document.getElementById("project-name").innerHTML = "Current project: : " + project.title
    document.getElementById("project-name").style.backgroundColor = project.color
})
document.getElementById("create-project").addEventListener("click" , () => showProjectForm())
document.getElementById("form-project-close").addEventListener("click" , () => hideProjectForm())






//////////////////////////////////////////////
createProjectEl(1)
    renderProject(1)