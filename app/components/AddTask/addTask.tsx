import { getEnumValues } from "@/utils/services/getEnumValues";
import TaskForm from "../TaskForm/taskForm";

const AddTask = async () => {
  const statuses = await getEnumValues("status");
  const priorities = await getEnumValues("priority");

  return (
    <TaskForm
      statuses={statuses}
      priorities={priorities}
    />
  );
};

export default AddTask;
