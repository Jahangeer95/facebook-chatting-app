import { useCallback, useEffect, useRef, useState } from "react";
import { CreatePage } from "./CreatePage";
import { PageList } from "./PageList";
import { Users } from "./Users";
import { CreateUser } from "./CreateUser";
import { LogoutButton } from "../../helper/LogoutButton";
import { UserDetail } from "./UserDetails";
import { getPages, getUsers } from "../../api/Login";
import { toast } from "react-toastify";
// import { user } from "../../config";

export function Pages() {
  const [selected, setSelected] = useState("");
  //current user
  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log("Logged In User:", user);
  const [pages, setPages] = useState([]);
  const [users, setUsers] = useState([]);
  const hasFetched=useRef(false);
  //loggedIn user
  const [user,setUser]=useState(null);
  useEffect(()=>{
    const loggedInUser=JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  },[])

  const getPage =useCallback( async () => {
    try {
      const data = await getPages();
      console.log("Data", data);
      setPages(data || []);
    } catch (err) {
      toast.error("Failed to load pages");
    }
  },[]);

  const getAllUsers = useCallback( async () => {
    try {
      const data = await getUsers();
      console.log("Data of users", data);
      setUsers(data || []);
    } catch (err) {
      toast.error("Failed to load users");
    }
  },[]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    getPage();
    getAllUsers();
  }, [getAllUsers,getPage]);

  return (
    <div>
      <LogoutButton />
      <UserDetail />
      <div className="flex flex-col sm:flex-row justify-center bg-white items-start rounded-md space-y-10 space-x-5  sm:m-5 sm:items-center">
        <div className="m-5 flex flex-col  w-full md:w-1/2">
          {(user?.role === "ADMIN" || user?.role === "OWNER" || user?.role === "MANAGER") && (
            <button
              className="p-2 bg-blue-600 rounded hover:bg-blue-700 text-white hover:scale-105 w-fit"
              onClick={() => setSelected("create")}
            >
             Link Page
            </button>
          )}
          {selected === "create" && (
            <CreatePage setSelected={setSelected} refreshPages={getPage} refreshUsers={getAllUsers}/>
          )}
          <PageList pages={pages} fetchPage={getPage} refreshUsers={getAllUsers} users={users}/>
        </div>
        <div className="m-2 flex flex-col  w-full md:w-1/2">
          {(user?.role === "ADMIN" || user?.role === "OWNER" || user?.role === "MANAGER") && (
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
