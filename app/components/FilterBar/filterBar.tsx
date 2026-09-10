// import React from "react";

// const FilterBar = () => {
//   return (
//     <div className="mb-6 bg-gray-200 rounded-xl">
//       <input 
//       type="text"
//       placeholder="Search tasks..."
//       className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
//       ></input>
      
//       <select name="status" defaultValue="">
//         <option></option>
//       </select>
//     </div>
//   );
// };

// export default FilterBar;

import { getEnumValues } from "@/utils/services/getEnumValues";

const FilterBar = async () => {
  const statuses = await getEnumValues("status");
  const priorities = await getEnumValues("priority");

  return (
    <div className="mb-6 rounded-xl bg-gray-200 p-4">
      <input
        type="text"
        placeholder="Search tasks..."
        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      />

      <select
        name="status"
        defaultValue=""
        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      >
        <option value="">All statuses</option>

        {statuses.map((status: string) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>

      <select
        name="priority"
        defaultValue=""
        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      >
        <option value="">All priorities</option>

        {priorities.map((priority: string) => (
          <option key={priority} value={priority}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="due_date"
        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default FilterBar;