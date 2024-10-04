import Input from './Input.jsx';
import { useState, useRef } from 'react';

export default function NewProject({ saveProject, cancel }) {
    const projectName = useRef();
    const projectDescription = useRef();
    const projectDate = useRef();


    function handleSave() {
        const name = projectName.current.value;
        const desc = projectDescription.current.value;
        const date = projectDate.current.value;
        saveProject(name, desc, date);
    }


    return (
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button onClick={cancel} className="text-stone-800 hover:text-stone-950">Cancel</button>
                </li>
                <li>
                    <button
                        className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                        onClick={handleSave}
                    >Save</button>
                </li>
            </menu>
            <div>
                <Input ref={projectName} type="text" label="Title" />
                <Input ref={projectDescription} label="Description" textarea />
                <Input ref={projectDate} type="date" label="Due Date" />
            </div>
        </div>
    );
}