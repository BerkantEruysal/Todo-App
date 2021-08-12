export const loadData = function(){

}
export const saveData = function(){

}

export const getTodoById = function(todo_id){
    let returnedTodo;
    _projectList.map(project => {
        project.todos.forEach(todo => {
            if (todo.id == todo_id){
                returnedTodo = todo;
            }
        })
    })
    return returnedTodo
}
export const getProjectById = function(project_id){
    let returnedProject;
    _projectList.forEach(project => {
        if(project.id == project_id){
            returnedProject = project
        }
    })
    return returnedProject
}
let _projectList = [{color : "blue", title : "Default" , todos: [], isVisible : true , isDone : false , isSelected : true , id : 1 , priority : 1}]
export const getProjectList = () => _projectList;
export const setProjectList = (value) => _projectList = value
export const addProjectToProjectList = (project) => _projectList.push(project)
export const removeProjectFromProjectList = (project_id) => {
    _projectList.splice(_projectList.indexOf(getProjectById(project_id)) , 1)
}


