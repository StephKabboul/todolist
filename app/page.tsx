import TaskArea from "./components/TaskArea/taskArea";
import { getEnumValues } from "@/utils/services/getEnumValues";
import { getTasks } from "@/utils/services/getTask";

export default async function Home() {
 const tasks = await getTasks() 

  const statuses = await getEnumValues("status");
  const priorities = await getEnumValues("priority");

  return (
    <div className="flex flex-row m-10">
      <div id="TaskFormContainer" className="flex "></div>
      <div id="taskDisplay" className="flex flex-col w-full">
        <TaskArea
          tasks={tasks}
          statuses={statuses}
          priorities={priorities}
        ></TaskArea>
      </div>
    </div>
  );
}
