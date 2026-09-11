"use client";
import { DeleteCard } from "@/utils/services/deleteCard";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  taskId: number; // The error fix from earlier
}


export default function DeleteButton({ taskId }: DeleteButtonProps) {
  const router = useRouter()
  
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await DeleteCard(taskId);

    if (result.success){
        alert("Task deleted successfully")
        router.refresh()
    }else{
        alert(`Failed to delete: ${result.error}`)
    }
    setIsDeleting(false);
    setIsOpen(false); // Close modal after completion
  };

  return (
    <>
      {/* Main Trigger Button */}
      <button onClick={() => setIsOpen(true)} className=" cursor-pointer">
        <Image
          src="/trash-bin.png" // Image placed inside the public/ folder
          alt="delete button"
          width={24}
          height={24}
        />
      </button>

      {/* Confirmation Backdrop & Window */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <h3 className="text-lg font-bold mb-2">Are you absolutely sure?</h3>
            <p className="text-gray-600 text-sm mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
              {/* No / Cancel Button */}
              <button
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>

              {/* Yes / Confirm Button */}
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
