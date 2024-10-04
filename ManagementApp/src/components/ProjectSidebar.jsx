import Button from "./Button";

export default function ProjectSidebar({ projects, selectToShow, addProject, selectedProject }) {
    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200"> your projects</h2>
            <div>
                <button onClick={addProject} className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100">
                    + Add Project
                </button>
            </div>
            <ul>

                {projects && Object.entries(projects).map(([id, project]) => {

                    let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-8000";

                    if (selectedProject && project.id === selectedProject.id) {
                        cssClasses += ' bg-stone-800 text-stone-200';
                    }
                    else {
                        cssClasses += ' text-stone-400';
                    }
                    return (
                        <li key={id}>
                            <Button onClick={() => selectToShow(project.id)}
                                className={cssClasses}>
                                {project.title}
                            </Button>
                        </li>
                    );
                }

                )}



            </ul>
        </aside>
    );
}