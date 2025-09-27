import { useState } from "react";
import { CreatePage } from "./CreatePage";
import { PageList } from "./PageList";
import { Users } from "./Users";

export function Pages() {
  const [selected, setSelected] = useState("");

  return (
    // <div className="flex justify-center items-center border h-screen bg-white">
    <div className="flex justify-center bg-white items-start rounded-md p-6 gap-6">
      <div className="m-2 flex flex-col">
        <button
          className="p-2 bg-blue-600 rounded hover:bg-blue-700 text-white hover:scale-105 w-fit"
          onClick={() => setSelected("create")}
        >
          Create Page
        </button>
        {selected === "create" && <CreatePage setSelected={setSelected} />}
        <PageList />
      </div>
      <div className="m-2 flex flex-col">
        <button
          className="p-2 bg-blue-600 rounded hover:bg-blue-700 text-white hover:scale-105 w-fit"
          onClick={() => setSelected("user")}
        >
          Create User
        </button>
        {selected === "user"}
        <Users />
      </div>
      {/* </div> */}
    </div>
  );
}
