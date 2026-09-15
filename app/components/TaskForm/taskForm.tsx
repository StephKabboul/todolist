"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { saveTask } from "@/utils/services/saveTask";
import { UpdateCard } from "@/utils/services/updateCard";

type Task = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  priority: string;
};

type TaskFormProps = {
  statuses: string[];
  priorities: string[];
  task?: Task | null;
  onCancelEdit?: () => void;
  onTaskChanged?: () => Promise<void>;
};

const TaskForm = ({
  statuses,
  priorities,
  task,
  onCancelEdit,
  onTaskChanged,
}: TaskFormProps) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load the selected task into the form when editing
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.due_date);
      setStatus(task.status);
      setPriority(task.priority);
    } else {
      clearForm();
    }
  }, [task]);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("");
    setPriority("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    // EDIT MODE
    if (task) {
      const result = await UpdateCard(
        task.id,
        title,
        description,
        dueDate,
        status,
        priority,
      );

      if (result.success) {

        clearForm();

        if (onTaskChanged) {
          await onTaskChanged();
        }
        if (onCancelEdit) {
          onCancelEdit();
        }
      } else {
        alert(`Failed to update task: ${result.error}`);
      }
    }

    // ADD MODE
    else {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("due_date", dueDate);
      formData.append("status", status);
      formData.append("priority", priority);

      await saveTask(formData);

      clearForm();
      if (onTaskChanged) {
        await onTaskChanged();
      }

    }

    setIsSubmitting(false);
  };

  const handleCancel = () => {
    clearForm();

    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className=" w-448 max-w-md rounded-xl border-gray-400 bg-gray-200 p-6">
      <h2 className="mb-6 font-bold text-2xl">
        {task ? "Edit Task" : "Add Task"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          >
            <option value="">Select a priority</option>

            {priorities.map((priority: string) => (
              <option key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {isSubmitting
            ? task
              ? "Updating..."
              : "Adding..."
            : task
              ? "Update Task"
              : "Add Task"}
        </button>

        {task && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-gray-400 px-4 py-2 font-medium hover:bg-gray-100"
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
