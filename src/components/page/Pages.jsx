import { useEffect, useState } from "react";
import { CreatePage } from "./CreatePage";
import { PageList } from "./PageList";
import { Users } from "./Users";
import { CreateUser } from "./CreateUser";
import { LogoutButton } from "../../helper/LogoutButton";
import { UserDetail } from "./UserDetails";
import { getPages, getUsers } from "../../api/Login";
import { toast } from "react-toastify";

export function Pages() {
  const [selected, setSelected] = useState("");
  //current user
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log("Logged In User:", user);
  const [pages, setPages] = useState([]);
  const [users, setUsers] = useState([]);

  const getPage = async () => {
    try {
      const data = await getPages();
      console.log("Data", data);
      setPages(data || []);
    } catch (err) {
      toast.error("Failed to load insights");
    }
  };

  const getAllUsers = async () => {
    try {
      const data = await getUsers();
      console.log("Data of users", data);
      setUsers(data || []);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    getPage();
    getAllUsers();
  }, []);

  return (
    <div>
      <LogoutButton />
      <UserDetail />
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
          {selected === "create" && (
            <CreatePage setSelected={setSelected} refreshPages={getPage} />
          )}
          <PageList pages={pages} fetchPage={getPage} refreshUsers={getAllUsers} users={users}/>
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
          {selected === "user" && <CreateUser setSelected={setSelected} users={users} refreshUsers={getAllUsers}/>}
          <Users users={users} refreshUsers={getAllUsers}/>
        </div>
      </div>
    </div>
  );
}
