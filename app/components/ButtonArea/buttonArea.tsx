
// import DeleteButton from "../DeleteButton/deleteButton"
// import UpdateButton from "../UpdateButton/updateButton";


// type ButtonAreaProps = { task: { id: number; }; };

// const ButtonArea = ({task}: ButtonAreaProps)=> {
//   return (
//     <div className="max-w-2xl mx-auto">
//       {/* ✅ PASS THE SINGLE POST ID HERE */}
//       <DeleteButton taskId={task.id} />
//     </div>
//   );
// }

// export default ButtonArea

import DeleteButton from "../DeleteButton/deleteButton";
import UpdateButton from "../UpdateButton/updateButton";

type Task = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  priority: string;
};

type ButtonAreaProps = {
  task: Task;
  onEdit: (task: Task) => void;
   onTaskChanged?: () => Promise<void>;
};

const ButtonArea = ({ task, onEdit, onTaskChanged }: ButtonAreaProps) => {
  return (
    <div className="max-w-2xl mx-auto flex gap-2">
      <UpdateButton task={task} onEdit={onEdit} />

      <DeleteButton taskId={task.id} onTaskChanged={onTaskChanged} />
    </div>
  );
};

export default ButtonArea;
