export const loadData = function(){

}
export const saveData = function(){

}

export const getTodoFromId = function(todo_id){
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
export const getProjectFromId = function(project_id){
    let returnedProject;
    _projectList.forEach(project => {
        if(project.id == project_id){
            returnedProject = project
        }
    })
    return returnedProject
}
let _projectList = [{id : 1 , todos : [{id : 2}]}, {id : 3 , todos : [{id : 4}]}]
export const getProjectList = () => _projectList;
export const setProjectList = (value) => _projectList = value


