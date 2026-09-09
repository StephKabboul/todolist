import React from "react";

const FilterBar = () => {
  return (
    <div className="mb-6 bg-gray-200 rounded-xl">
      <input 
      type="text"
      placeholder="Search tasks..."
      className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      ></input>
      
      <select name="status" defaultValue="">
        <option></option>
      </select>
    </div>
  );
};

export default FilterBar;
