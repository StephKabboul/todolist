"use client";
import Image from "next/image";

type Task = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  priority: string;
};

interface UpdateButtonProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function UpdateButton({ task, onEdit }: UpdateButtonProps) {
    
return(
      <button onClick={() => onEdit(task)} className="cursor-pointer">
        <Image
          src="/edit.png"
          alt="edit button"
          width={24}
          height={24}
        />
      </button>
  );
}
