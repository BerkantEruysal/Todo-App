import {
  createProjectEl,
  createTodoEl,
  getProjectElementList,
  getTodoElementList,
  renderProject,
  setProjectElementList,
  setTodoElementList,
  renderTodo,
  selectProjectElement,
} from "./dom-manager.js";
import { getSelectedProject, setSelectedProject } from "./state-manager.js";

export const loadData = function () {
  const data = JSON.parse(localStorage.getItem("todo-data"));
  if (data != undefined) {
    if (data.projectList.length > 0) {
      setProjectList(data.projectList);
    }
    if (getProjectById(data.selectedProject)) {
      setSelectedProject(data.selectedProject);
    }
  }
  _projectList.forEach((project) => {
    createProjectEl(project.id);
    renderProject(project.id);

    project.todos.forEach((todo) => {
      createTodoEl(todo.id);
      renderTodo(todo.id);
    });
  });
  if (!getProjectById(getSelectedProject())) {
    selectProjectElement(_projectList[0].id);
  } else {
    selectProjectElement(getSelectedProject());
  }
};
export const saveData = function () {
  localStorage.setItem(
    "todo-data",
    JSON.stringify({
      projectList: getProjectList(),
      selectedProject: getSelectedProject(),
    })
  );
};

export const getTodoById = function (todo_id) {
  let returnedTodo;
  _projectList.map((project) => {
    project.todos.forEach((todo) => {
      if (todo.id == todo_id) {
        returnedTodo = todo;
      }
    });
  });
  return returnedTodo;
};
export const getProjectById = function (project_id) {
  let returnedProject;
  _projectList.forEach((project) => {
    if (project.id == project_id) {
      returnedProject = project;
    }
  });
  return returnedProject;
};
let _projectList = [
  {
    color: "#FF9924",
    title: "Default",
    todos: [],
    isVisible: true,
    isDone: false,
    isSelected: true,
    id: 1,
    priority: 1,
  },
];
export const getProjectList = () => _projectList;
export const setProjectList = (value) => (_projectList = value);
export const addProjectToProjectList = (project) => _projectList.push(project);
export const removeProjectFromProjectList = (project_id) => {
  _projectList.splice(_projectList.indexOf(getProjectById(project_id)), 1);
};
