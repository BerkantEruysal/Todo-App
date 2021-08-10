import { getProjectList } from "./data-manager.js";
export default function uniqueIdGenerator () {
  let allId = [];
  let returnedId = 1;
  getProjectList().forEach((project) => {
    allId.push(project.id);
    project.todos.forEach((todo) => {
      allId.push(todo.id);
    });
  });

  allId.forEach(() => {
      if(_isIdTaken(returnedId , allId)){
          returnedId ++;
      }
  })
  return returnedId;
}


const _isIdTaken = function (returnedId, list) {
  return list.some((listId) => {
  return listId == returnedId
})
};
