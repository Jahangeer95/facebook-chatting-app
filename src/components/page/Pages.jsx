import { useState } from "react";
import { CreatePage } from "./CreatePage";
import { PageList } from "./PageList";
import { Users } from "./Users";

export function Pages() {
  const [selected, setSelected] = useState("");

  return (
    // <div className="flex justify-center items-center border h-screen bg-white">
      <div className="flex flex-col bg-white items-center rounded-md p-6">
        <button
          className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 text-white hover:scale-105 w-28"
          onClick={() => setSelected("create")}
        >
          Create Page
        </button>
        {/* <button
          className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 text-white hover:scale-105"
          onClick={() => setSelected("get")}
        >
          View Pages
        </button> */}
      {/* </div> */}
      {selected === "create" && <CreatePage setSelected={setSelected} />}
      <div className="flex m-auto">
      <PageList/>
      <Users/>
      </div>
      
    </div>
  );
}
