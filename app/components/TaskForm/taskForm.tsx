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
  onTaskAdded?: (taskId: number) => void;
  onClose?: () => void;
};

const TaskForm = ({
  statuses,
  priorities,
  task,
  onCancelEdit,
  onTaskChanged,
  onTaskAdded,
  onClose,
}: TaskFormProps) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [priority, setPriority] = useState("Not Urgent");
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
    setStatus("Not Started");
    setPriority("Not Urgent");
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

      const result = await saveTask(formData);

      if (result.success) {
        clearForm();

        if (onTaskChanged) {
          await onTaskChanged();
        }

        if (result.taskId && onTaskAdded) {
          onTaskAdded(result.taskId);
        }

        if (onClose) {
          onClose();
        }
      } else {
        alert(`Failed to add task: ${result.error}`);
      }
    }
    setIsSubmitting(false);
  };
  const handleCancel = () => {
    clearForm();

    if (task) {
      if (onCancelEdit) {
        onCancelEdit();
      }
    } else {
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div className="relative w-full max-w-md h-full rounded-xl border-gray-400 bg-gray-200 p-6 sm:p-8">
      <h2 className="mb-6 text-xl font-bold sm:text-2xl">
        {task ? "Edit Task" : "Add Task"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex h-[calc(100%-3.5rem)] flex-col"
      >
        {/* Title */}
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium">
              Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Buy groceries"
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
              placeholder="e.g. Get milk and potatoes"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 sm:min-h-27.5"
            />
          </div>

          {/* Due Date */}
          <div>
            <label
              htmlFor="due_date"
              className="mb-1 block text-sm font-medium"
            >
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
              {statuses.map((status: string) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label
              htmlFor="priority"
              className="mb-1 block text-sm font-medium"
            >
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            >
              {priorities.map((priority: string) => (
                <option key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-1 items-start pt-8">
          <div className="flex w-full gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {isSubmitting
                ? task
                  ? "Updating..."
                  : "Adding..."
                : task
                  ? "Update Task"
                  : "Add Task"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1 rounded-lg border border-gray-400 px-4 py-2 font-medium hover:bg-gray-100 disabled:opacity-50"
            >
              {task ? "Cancel Edit" : "Cancel"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
