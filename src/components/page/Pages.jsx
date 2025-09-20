import { useState } from "react";
import { CreatePage } from "./CreatePage";
import { PageList } from "./PageList";

export function Pages() {
  const [selected, setSelected] = useState("");

  return (
    <div className="flex justify-center items-center border h-screen bg-white">
      <div className="flex space-x-4 rounded-md shadow-md p-6">
        <button
          className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 text-white hover:scale-105"
          onClick={() => setSelected("create")}
        >
          Create Page
        </button>
        <button
          className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 text-white hover:scale-105"
          onClick={() => setSelected("get")}
        >
          Get Pages
        </button>
      </div>
      {selected === "create" && <CreatePage setSelected={setSelected} />}
      {selected === "get" && <PageList setSelected={setSelected} />}
    </div>
  );
}
