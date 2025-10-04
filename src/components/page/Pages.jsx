import { useState } from "react";
import { CreatePage } from "./CreatePage";
import { PageList } from "./PageList";
import { Users } from "./Users";
import { CreateUser } from "./CreateUser";
import { LogoutButton } from "../../helper/LogoutButton";

export function Pages() {
  const [selected, setSelected] = useState("");
  //current user
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log("Logged In User:", user);

  return (
    <div>
      <LogoutButton/>
    <div className="flex justify-center bg-white items-start rounded-md p-2 gap-4">
      <div className="m-2 flex flex-col">
        {user?.role === "ADMIN" && (
          <button
            className="p-2 bg-blue-600 rounded hover:bg-blue-700 text-white hover:scale-105 w-fit"
            onClick={() => setSelected("create")}
          >
            Create Page
          </button>
        )}
        {selected === "create" && <CreatePage setSelected={setSelected} />}
        <PageList />
      </div>
      <div className="m-2 flex flex-col">
        {user?.role === "ADMIN" && (
          <button
            className="p-2 bg-blue-600 rounded hover:bg-blue-700 text-white hover:scale-105 w-fit"
            onClick={() => setSelected("user")}
          >
            Create User
          </button>
        )}
        {selected === "user" && <CreateUser setSelected={setSelected} />}
        <Users />
      </div>
    </div>
    </div>
  );
}
