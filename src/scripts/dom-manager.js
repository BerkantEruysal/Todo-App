import {
  addProjectToProjectList,
  getProjectById,
  getProjectList,
  getTodoById,
  removeProjectFromProjectList,
} from "./data-manager.js";
import { createTodo, editTodo } from "./todo-manager.js";
import {
  removeTodo,
  addTodo,
  createProject,
  editProject,
} from "./project-manager.js";
import { getSelectedProject, setSelectedProject } from "./state-manager.js";
let _todoElementList = [];
let _projectElementList = [];
export const createTodoEl = function (todo_id) {
  let isEditing = false;
  const createdTodo = getTodoById(todo_id);
  const elementContainer = document.createElement("div");
  const title = document.createElement("h4");
  const description = document.createElement("p");
  const date = document.createElement("p");
  const doneBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const buttonDiv = document.createElement("div");

  title.innerHTML = createdTodo.title;
  description.innerHTML = createdTodo.description;
  date.innerHTML = createdTodo.deadline;
  doneBtn.innerHTML = createdTodo.isDone ? "undone" : "done";
  deleteBtn.innerHTML = "delete";
  editBtn.innerHTML = "edit";

  buttonDiv.className = "button-div";

  deleteBtn.addEventListener("click", () => {
    deleteTodo(todo_id);
  });
  doneBtn.addEventListener("click", () =>
    doneTodo(createdTodo, elementContainer)
  );
  editBtn.addEventListener("click", () => {
    if (getTodoElementById(todo_id).isEditing == false) {
      createTodoEditForm(createdTodo.id);
      getTodoElementById(todo_id).isEditing = true;
    }
  });
  elementContainer.className = "todo-item";
  elementContainer.id = createdTodo.id;
  elementContainer.style.backgroundColor = createdTodo.color;

  elementContainer.appendChild(title);
  elementContainer.appendChild(description);
  elementContainer.appendChild(date);
  buttonDiv.appendChild(doneBtn);
  buttonDiv.appendChild(deleteBtn);
  buttonDiv.appendChild(editBtn);
  elementContainer.appendChild(buttonDiv);

  _todoElementList.push({
    elementContainer,
    title,
    description,
    date,
    doneBtn,
    id: todo_id,
    isEditing,
  });
};
const createProjectEl = function (project_id) {
  const createdProject = getProjectById(project_id);
  const elementContainer = document.createElement("div");
  const title = document.createElement("h3");
  const totalTodos = document.createElement("p");
  const visibilityBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const selectBtn = document.createElement("button");
  const isEditing = false;

  title.innerHTML = createdProject.title;
  title.className = "project-title";
  totalTodos.innerHTML = `Todos in project : ${createdProject.todos.length}`;
  visibilityBtn.innerHTML = createdProject.isVisible ? "hide" : "show";
  deleteBtn.innerHTML = "Delete Project";
  editBtn.innerHTML = "Edit";
  selectBtn.innerHTML = createdProject.isSelected ? "selected" : "select";
  elementContainer.style.backgroundColor = createdProject.color;
  elementContainer.id = project_id;
  elementContainer.classList.add("project-element");

  deleteBtn.addEventListener("click", () => deleteProject(createdProject.id));
  editBtn.addEventListener("click", () => {
    if (getProjectElementById(project_id).isEditing == false) {
      createProjectEditForm(project_id);
      getProjectElementById(project_id).isEditing = true;
    }
  });
  selectBtn.addEventListener("click", () => {
    if (createdProject.isSelected == false) {
      selectProjectElement(project_id);
      refreshProjectElement(project_id);
    }
  });
  visibilityBtn.addEventListener("click", () => {
    if (getProjectById(project_id).isVisible == true) {
      hideProject(project_id);
    } else {
      showProject(project_id);
    }
  });
  elementContainer.appendChild(title);
  elementContainer.appendChild(totalTodos);
  elementContainer.appendChild(visibilityBtn);
  elementContainer.appendChild(editBtn);
  elementContainer.appendChild(selectBtn);
  elementContainer.appendChild(deleteBtn);

  _projectElementList.push({
    elementContainer,
    title,
    totalTodos,
    visibilityBtn,
    deleteBtn,
    editBtn,
    selectBtn,
    id: project_id,
    isEditing,
  });
};
const removeTodoEl = function (todo_id) {
  _todoElementList.splice(
    _todoElementList.indexOf(getTodoElementById(todo_id)),
    1
  );
  document.getElementById(todo_id).remove();
};
const removeProjectEl = function (project_id) {
  _projectElementList.splice(
    _projectElementList.indexOf(getProjectElementById(project_id)),
    1
  );
  document.getElementById(project_id).remove();
};
export const refreshTodoElement = function (todo_id) {
  const refreshedTodoElement = getTodoElementById(todo_id);
  const todo = getTodoById(todo_id);
  refreshedTodoElement.title.innerHTML = todo.title;
  refreshedTodoElement.description.innerHTML = todo.description;
  refreshedTodoElement.date.innerHTML = todo.deadline;
  refreshedTodoElement.doneBtn.innerHTML = todo.isDone ? "undone" : "done";
  refreshedTodoElement.elementContainer.style.backgroundColor = todo.color;
};
export const refreshProjectElement = function (project_id) {
  const refreshedProject = getProjectElementById(project_id);
  const project = getProjectById(project_id);
  refreshedProject.title.innerHTML = project.title;
  refreshedProject.totalTodos.innerHTML = `Todos in project : ${project.todos.length}`;
  refreshedProject.visibilityBtn.innerHTML = project.isVisible
    ? "hide"
    : "show";
  refreshedProject.selectBtn.innerHTML = project.isSelected
    ? "selected"
    : "select";
  refreshedProject.elementContainer.style.backgroundColor = project.color;
  if (project.isSelected) {
    refreshedProject.elementContainer.classList.add("selected-project");
    document.getElementById("project-name").innerHTML =
      "Currnet project : " + project.title;
  } else {
    refreshedProject.elementContainer.classList.remove("selected-project");
  }

  document.getElementById("project-name").style.backgroundColor =
    getProjectById(getSelectedProject()).color;

  project.todos.forEach((todo) => {
    todo.color = project.color;
    if (project.isVisible == true) {
      refreshTodoElement(todo.id);
    }
  });
};
const getTodoElementById = function (todo_id) {
  let returnedTodo;
  _todoElementList.forEach((todo) => {
    if (todo.id == todo_id) {
      returnedTodo = todo;
    }
  });
  return returnedTodo;
};
const getProjectElementById = function (project_id) {
  let returnedProject;
  _projectElementList.forEach((project) => {
    if (project.id == project_id) {
      returnedProject = project;
    }
  });
  return returnedProject;
};
const renderTodo = function (todo_id) {
  const tdList = document.getElementById("td-list");
  tdList.appendChild(getTodoElementById(todo_id).elementContainer);
};
const renderProject = function (project_id) {
  document
    .getElementById("project-list")
    .appendChild(getProjectElementById(project_id).elementContainer);
};

const doneTodo = function (todo, elementContainer) {
  todo.isDone = !todo.isDone;
  if (todo.isDone == true) {
    elementContainer.classList.add("done-todo");
  } else elementContainer.classList.remove("done-todo");
  refreshTodoElement(todo.id);
};
const deleteTodo = function (todo_id) {
  const parentProject = getProjectById(getTodoById(todo_id).project_id);
  if (parentProject.isVisible == true) {
    removeTodoEl(todo_id);
  }

  removeTodo(getTodoById(todo_id).project_id, todo_id);
  refreshProjectElement(parentProject.id);
};
const deleteProject = function (project_id) {
  const todoList = [...getProjectById(project_id).todos];
  todoList.forEach((todo) => {
    deleteTodo(todo.id);
  });
  if (getSelectedProject() == project_id) {
    selectProjectElement(getProjectList()[0].id);
  }

  removeProjectEl(project_id);
  removeProjectFromProjectList(project_id);

  if (getProjectList().length == 0) {
    document.getElementById("project-name").innerHTML =
      "There is no project here ;(";
  }
};
const showTodoForm = function () {
  document.getElementById("todo-form").classList.remove("hidden");
};
const hideTodoForm = function () {
  document.getElementById("form-todo-title").value = "";
  document.getElementById("form-todo-description").value = "";
  document.getElementById("form-todo-date").value = "";
  document.getElementById("todo-form").classList.add("hidden");
};
const showProjectForm = function () {
  document.getElementById("project-form").classList.remove("hidden");
};
const hideProjectForm = function () {
  document.getElementById("form-project-title").value = "";
  document.getElementById("project-form").classList.add("hidden");
};

const selectProjectElement = function (project_id) {
  const project = getProjectById(project_id);
  const projectElement = getProjectElementById(project_id);
  projectElement.elementContainer.classList.add("selected-project");

  const oldSelectedProject = getSelectedProject();
  setSelectedProject(project.id);
  refreshProjectElement(oldSelectedProject);

  document.getElementById("project-name").innerHTML =
    "Selected project: : " + project.title;
  document.getElementById("project-name").style.backgroundColor = project.color;
};

const createTodoEditForm = function (todo_id) {
  const editedTodo = getTodoById(todo_id);
  const formContainer = document.createElement("div");
  const titleInput = document.createElement("input");
  const descriptionInput = document.createElement("input");
  const deadlineInput = document.createElement("input");
  const cancelBtn = document.createElement("button");
  const submitBtn = document.createElement("button");
  const titleText = document.createElement("p");
  const descriptionText = document.createElement("p");
  const deadlineText = document.createElement("p");

  titleText.innerHTML = "Title : ";
  descriptionText.innerHTML = "Description : ";
  deadlineText.innerHTML = "Deadline : ";
  submitBtn.innerHTML = "save";
  cancelBtn.innerHTML = "X";
  deadlineInput.type = "date";
  formContainer.className = "todo-edit-form";
  formContainer.id = `${todo_id}-edit-form`;
  submitBtn.addEventListener("click", () => {
    editTodo(todo_id, {
      project_id: getTodoById(todo_id).project_id,
      title: titleInput.value,
      deadline: deadlineInput.value,
      description: descriptionInput.value,
      isDone: getTodoById(todo_id).isDone,
      color: getTodoById(todo_id).color,
      priority: getTodoById(todo_id).priority,
    });
    refreshTodoElement(todo_id);
    getTodoElementById(todo_id).isEditing = false;
    closeTodoEditForm(todo_id);
  });
  cancelBtn.addEventListener("click", () => closeTodoEditForm(todo_id));

  titleInput.value = editedTodo.title;
  descriptionInput.value = editedTodo.description;
  deadlineInput.value = editedTodo.deadline;

  formContainer.appendChild(cancelBtn);
  formContainer.appendChild(titleText);
  formContainer.appendChild(titleInput);
  formContainer.appendChild(descriptionText);
  formContainer.appendChild(descriptionInput);
  formContainer.appendChild(deadlineText);
  formContainer.appendChild(deadlineInput);
  formContainer.appendChild(submitBtn);
  formContainer.appendChild(cancelBtn);

  document.getElementById(todo_id).appendChild(formContainer);
};

const closeTodoEditForm = function (todo_id) {
  getTodoElementById(todo_id).isEditing = false;
  document.getElementById(todo_id + "-edit-form").remove();
};

const createProjectEditForm = function (project_id) {
  const editedProject = getProjectById(project_id);
  const formContainer = document.createElement("div");
  const titleInput = document.createElement("input");
  const colorInput = document.createElement("input");
  const cancelButton = document.createElement("button");
  const saveButton = document.createElement("button");
  const titleText = document.createElement("p");
  const colorText = document.createElement("p");

  titleInput.value = editedProject.title;
  titleText.innerHTML = "Title : ";

  colorInput.type = "color";
  colorInput.value = editedProject.color;
  cancelButton.innerHTML = "X";
  saveButton.innerHTML = "save";
  colorText.innerHTML = "Color : ";

  formContainer.id = `${project_id}-edit-form`;
  formContainer.className = "project-edit-form";

  saveButton.addEventListener("click", () => {
    editProject(project_id, {
      color: colorInput.value,
      title: titleInput.value,
      isVisible: editedProject.isVisible,
      priority: editedProject.priority,
      isDone: editedProject.isDone,
    });
    refreshProjectElement(project_id);
    closeProjectEditForm(project_id);
  });
  cancelButton.addEventListener("click", () =>
    closeProjectEditForm(project_id)
  );

  formContainer.appendChild(cancelButton);
  formContainer.appendChild(titleText);
  formContainer.appendChild(titleInput);
  formContainer.appendChild(colorText);
  formContainer.appendChild(colorInput);
  formContainer.appendChild(saveButton);

  document.getElementById(project_id).appendChild(formContainer);
};
const closeProjectEditForm = function (project_id) {
  getProjectElementById(project_id).isEditing = false;
  document.getElementById(project_id + "-edit-form").remove();
};
const hideProject = function (project_id) {
  getProjectElementById(project_id).elementContainer.classList.add(
    "hidden-project"
  );
  getProjectById(project_id).isVisible = false;
  getProjectById(project_id).todos.forEach((todo) => {
    removeTodoEl(todo.id);
  });
  refreshProjectElement(project_id);
};
const showProject = function (project_id) {
  getProjectElementById(project_id).elementContainer.classList.remove(
    "hidden-project"
  );
  getProjectById(project_id).isVisible = true;
  getProjectById(project_id).todos.forEach((todo) => {
    createTodoEl(todo.id);
    renderTodo(todo.id);
  });
  refreshProjectElement(project_id);
};

document
  .getElementById("form-todo-create")
  .addEventListener("click", (event) => {
    if (getProjectList().length == 0) {
      alert("Please create a project first.");
      return;
    } else if (
      document.getElementById("form-todo-title").value.replace(/\s/g, "") ==
        "" ||
      document
        .getElementById("form-todo-description")
        .value.replace(/\s/g, "") == ""
    ) {
      alert("Please give a title and a description to your todo");
      return;
    }

    const title = document.getElementById("form-todo-title").value;
    const description = document.getElementById("form-todo-description").value;
    const date = document.getElementById("form-todo-date").value;
    const todo = createTodo(getSelectedProject(), title, date, description);
    addTodo(todo, getSelectedProject());
    if (getProjectById(getSelectedProject()).isVisible == true) {
      createTodoEl(todo.id);
      renderTodo(todo.id);
    }

    refreshProjectElement(todo.project_id);

    hideTodoForm();
  });

document
  .getElementById("form-todo-close")
  .addEventListener("click", () => hideTodoForm());

document
  .getElementById("create-todo")
  .addEventListener("click", () => showTodoForm());

document.getElementById("form-project-create").addEventListener("click", () => {
  if (
    document.getElementById("form-project-title").value.replace(/\s/g, "") == ""
  ) {
    alert("Please give a title to your new project");
    return;
  }
  const title = document.getElementById("form-project-title").value;
  const color = document.getElementById("form-project-color").value;
  const project = createProject(color, title);
  addProjectToProjectList(project);
  createProjectEl(project.id);
  selectProjectElement(project.id);
  renderProject(project.id);
  hideProjectForm();
});
document
  .getElementById("create-project")
  .addEventListener("click", () => showProjectForm());
document
  .getElementById("form-project-close")
  .addEventListener("click", () => hideProjectForm());

document.getElementById("form-project-color").value = "#99CDD6";

//////////////////////////////////////////////
createProjectEl(1);
selectProjectElement(1);
renderProject(1);
