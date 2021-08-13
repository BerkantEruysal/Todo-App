import { getProjectById } from "./data-manager.js";

let _showedProjects = []
let _selectedProject = 1

export const getShowedProjects = () => _showedProjects;
export const addToShowedProjectsList = (project_id) => _showedProjects.push(project_id)
export const removeFromShowedProjectsList = (project_id) => { _showedProjects.splice(_showedProjects.indexOf(project_id) , 1)} 
export const getSelectedProject = () => _selectedProject;
export const setSelectedProject = (value) => {
    getProjectById(_selectedProject).isSelected = false;
    _selectedProject = value
    getProjectById(_selectedProject).isSelected = true;}