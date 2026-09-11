
import DeleteButton from "../DeleteButton/deleteButton"
import UpdateButton from "../UpdateButton/updateButton";


type ButtonAreaProps = { task: { id: number; }; };

const ButtonArea = ({task}: ButtonAreaProps)=> {
  return (
    <div className="max-w-2xl mx-auto">
      {/* ✅ PASS THE SINGLE POST ID HERE */}
      <DeleteButton taskId={task.id} />
    </div>
  );
}

export default ButtonArea

