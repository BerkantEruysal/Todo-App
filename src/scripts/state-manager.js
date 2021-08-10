import { getProjectFromId } from "./data-manager.js";

let _showedProjects = []

export const getShowedProjects = () => _showedProjects;
export const addToShowedProjectsList = (project_id) => _showedProjects.push(project_id)
export const removeFromShowedProjectsList = (project_id) => { _showedProjects.splice(_showedProjects.indexOf(project_id) , 1)} 