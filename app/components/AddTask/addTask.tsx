import { getEnumValues } from "@/utils/services/getEnumValues";
import { saveTask } from "@/utils/services/saveTask";

const addTask = async () => {
  const statuses = await getEnumValues("status");
  const priorities = await getEnumValues("priority");

  return (
    <div className=" w-448 max-w-md rounded-xl border-gray-400 bg-gray-200 p-6">
      <h2 className="mb-6 font-bold text-2xl">Add Task</h2>
      <form action={saveTask} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Task title"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your task..."
            rows={4}
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="due_date" className="mb-1 block text-sm font-medium">
            Due date
          </label>
          <input
            id="due_date"
            name="due_date"
            type="date"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          >
            <option value="">Select status</option>
            {statuses.map((status: string) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="priority" className="mb-1 block text-sm font-medium">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          >
            <option value="">Select a priority</option>
            {priorities.map((priority: string) => (
              <option key={priority} value={priority}>
                {/* Capitalize first letter cleanly */}
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-gray-800"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default addTask;
