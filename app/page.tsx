import TaskArea from "./components/TaskArea/taskArea";
import { getEnumValues } from "@/utils/services/getEnumValues";
import { getTasks } from "@/utils/services/getTask";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

 const tasks = await getTasks() 

  const statuses = await getEnumValues("status");
  const priorities = await getEnumValues("priority");

  return (
  <div className="flex h-dvh overflow-hidden">
        <main className="min-w-0 flex-1">

    <TaskArea
      tasks={tasks}
      statuses={statuses}
      priorities={priorities}
    />
    </main>
  </div>
);
}
