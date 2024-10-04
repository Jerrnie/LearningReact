import AddTask from "./AddTask";

export default function Tasks({ tasks, onAdd, onDelete, id }) {

    function handleDelete(id, index) {
        onDelete(id, index);
    }

    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4"> Tasks</h2>
            <AddTask onAdd={onAdd} id={id} />

            {tasks.length === 0 && (
                <p className="text-stone-800 my-4">
                    This project does not have any task yet.
                </p>
            )}

            {tasks.length > 0 && (
                <ul className="p-4 mt-8 rounded-md bg-stone-100">
                    {tasks.map((task, index) => (
                        <li key={index} className="flex justify-between my-4">
                            <span>{task}</span>
                            <button
                                className="text-stone-700 hover:text-red-500"
                                onClick={() => handleDelete(id, index)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}


        </section>

    );
}