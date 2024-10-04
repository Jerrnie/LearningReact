import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import { useState, useEffect, useRef } from "react";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projects, setProjects] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const [selectedProject, setSelectedProject] = useState();
  const [isCreating, setIsCreating] = useState(false);

  // useEffect(() => {
  //   console.log("Projects updated:", projects);
  // }, [projects]);

  function addNewProject(title, desc, date) {
    const newProject = {
      id: idCounter,
      title,
      desc,
      date,
      task: []
    }

    setProjects((prevProjects) => ({
      ...prevProjects,
      [idCounter]: newProject
    }));

    toggleShowCreateProject();
    setSelectedProject(newProject);
    setIdCounter(idCounter + 1);
  }

  function selectProject(id) {
    setSelectedProject((prevSelected) => projects[id]);
    setIsCreating((prevCond) => false);
  }

  function toggleShowCreateProject() {
    setSelectedProject(undefined);
    setIsCreating((prevCond) => !prevCond);
  }

  function handleDelete(id) {
    setProjects((prevProject) => {
      const newProject = { ...prevProject };
      delete newProject[id];
      return newProject;
    });


    if (selectProject && selectedProject.id === id) {
      setSelectedProject(undefined);
    }
  }

  function handleAddTask(id, newTask) {

    setProjects((prevProjects) => {
      const projectToUpdate = prevProjects[id];

      if (!projectToUpdate) return prevProjects; // Check if project exists

      const updatedProject = {
        ...projectToUpdate, // Spread the existing project
        task: [...projectToUpdate.task, newTask] // Add new task
      };

      setSelectedProject((prevSelected) => updatedProject);

      return {
        ...prevProjects,
        [id]: updatedProject // Update the specific project in the state
      };
    });
  }

  function handleDeleteTask(projectId, taskIndex) {

    setProjects((prevProjects) => {
      const projectToUpdate = prevProjects[projectId];

      if (!projectToUpdate) return prevProjects; // Check if project exists

      const updatedProject = {
        ...projectToUpdate,
        task: projectToUpdate.task.filter((_, index) => index !== taskIndex), // Remove task at the given index
      };

      setSelectedProject((prevSelected) => updatedProject);

      return {
        ...prevProjects,
        [projectId]: updatedProject, // Update the specific project in the state
      };
    });
  }


  let content;

  if (isCreating) {
    content = <NewProject cancel={toggleShowCreateProject} saveProject={addNewProject} />
  }
  else if (selectedProject === undefined) {
    content = <NoProjectSelected show={toggleShowCreateProject} />
  }
  else {
    content = <SelectedProject onAdd={handleAddTask} onDelete={handleDeleteTask} handleDelete={handleDelete} project={selectedProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar selectToShow={selectProject} addProject={toggleShowCreateProject} projects={projects} selectedProject={selectedProject} />
      {content}


    </main>
  );
}

export default App;
