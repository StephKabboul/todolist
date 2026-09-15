"use client";

import { useEffect, useState } from "react";
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

type EditTaskModalProps = {
  task: Task;
  statuses: string[];
  priorities: string[];
  onClose: () => void;
  onTaskChanged?: () => Promise<void>;
  onUpdated: (taskId: number) => void;
};

const EditTaskModal = ({
  task,
  statuses,
  priorities,
  onClose,
  onTaskChanged,
  onUpdated,
}: EditTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.due_date);
    setStatus(task.status);
    setPriority(task.priority);
  }, [task]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    const result = await UpdateCard(
      task.id,
      title,
      description,
      dueDate,
      status,
      priority,
    );

    if (result.success) {
      if (onTaskChanged) {
        await onTaskChanged();
      }

      console.log("Updated task id:", task.id);

      onUpdated(task.id);
      onClose();
    } else {
      alert(`Failed to update task: ${result.error}`);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-gray-200 p-6">
        <h2 className="mb-6 text-2xl font-bold">Edit Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="edit-title"
              className="mb-1 block text-sm font-medium"
            >
              Title
            </label>

            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="edit-description"
              className="mb-1 block text-sm font-medium"
            >
              Description
            </label>

            <textarea
              id="edit-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="edit-due-date"
              className="mb-1 block text-sm font-medium"
            >
              Due date
            </label>

            <input
              id="edit-due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="edit-status"
              className="mb-1 block text-sm font-medium"
            >
              Status
            </label>

            <select
              id="edit-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="">Select status</option>

              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="edit-priority"
              className="mb-1 block text-sm font-medium"
            >
              Priority
            </label>

            <select
              id="edit-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="">Select priority</option>

              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-black px-4 py-2 font-medium text-white disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Task"}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-gray-400 px-4 py-2 font-medium"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
