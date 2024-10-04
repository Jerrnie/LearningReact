import { useRef } from "react";

export default function AddTask({ onAdd, id }) {
    const taskName = useRef();

    function handleAddTask() {
        onAdd(id, taskName.current.value);
        taskName.current.value = "";
    }

    return (
        <div className="flex items-center gap-4">
            <input
                className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                ref={taskName}
                type="text" />
            <button
                className="text-stone-700 hover:text-stone-950"
                onClick={handleAddTask}
            >
                Add Task
            </button>
        </div>
    );

}