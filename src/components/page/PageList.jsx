import { addUsersToPage, deletePageData } from "../../api/Login";
import {  useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DeletePage } from "./DeletePage";
import { UpdatePage } from "./UpdatePage";

export function PageList({pages,fetchPage,refreshUsers,users}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log("Logged In User:", user);
  const [selectedPageId, setSelectedPageId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedPage, setSelectedPage] = useState("");
  const [selectedUser, setSelectedUser] = useState(""); //selecteduser 
 //loogedIn user
  const [user,setUser]=useState(null);
  useEffect(()=>{
    const loggedInUser=JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  },[])

  const addUserToPage = async (pageId, userId) => {
    if (!userId) return;
    try {
      await addUsersToPage(pageId, userId);
      toast.success("User added successfully");
      // getAllUsers();
      setLoading(true);
      refreshUsers();
      setLoading(false);
    } catch (err) {
      toast.error("Failed to add user");
    }
  };

   //delete a page
    const handleDelete = async (pageId) => {
      try {
        await deletePageData(pageId);
        toast.success("Page deleted successfully");
        setOpenDelete(false);
        setSelectedPageId("");
        fetchPage();
        await refreshUsers();
      } catch (error) {
        toast.error(error.message);
      }
    };

  // useEffect(() => {
  //   refreshUsers();
  // }, [refreshUsers]);
  return (
    <div className="w-full md:w-full">
      <div className=" mb-4 border-b border-gray-400 p-2">
        <h2 className="text-lg font-semibold ">Pages</h2>
      </div>

      {loading ? (
        <p className="text-center m-4">Loading Available Pages...</p>
      ) : pages?.data?.pages?.length ? (
        <div className="overflow-x-auto space-y-2 mt-3 rounded-md w-full">
          <table className="min-w-full border-collapse  rounded-md">
            <thead className="bg-gray-50 text-blue-600">
              <tr>
                <th className="border px-2 py-1">Page Name</th>
                <th className="border px-2 py-1">Page Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages?.data?.pages?.map((item) => (
                <tr
                  key={item._id}
                  className="border hover:bg-gray-100"
                >
                  <td>
                    <h1 className="font-semibold text-gray-800 text-sm">
                      {item.page_name}
                    </h1>
                    <h2 className="font-semibold text-gray-500 text-sm">
                      {item.page_id}
                    </h2>
                  </td>
                  <td className="px-2 py-2 flex items-center gap-1.5">
                    <button
                      className="p-2 bg-blue-600 rounded hover:bg-blue-700 text-white hover:scale-105"
                      onClick={() => {
                        sessionStorage.setItem("fb_page_id", item.page_id);
                        console.log("Current Page Id",item.page_id);
                        sessionStorage.setItem(
                          "fb_access_token",
                          item.access_token
                        );
                        sessionStorage.setItem("fb_ad_account_id", item.ad_token_id);
                        if(user?.role=== "ADMIN" || user?.role=== "MANAGER"|| user?.role === "OWNER"){
                        navigate(`/${item.page_id}/home`);
                        }
                        else if(user?.role=== "EDITOR" || user?.role=== "MODERATOR"){
                          navigate(`/${item.page_id}/posts`);
                        }
                      }}
                    >
                      View
                    </button>
                    {/* add users to page */}
                    {(user?.role === "ADMIN" || user?.role === "OWNER" || user?.role === "MANAGER" ) && (
                      <select
                        value={selectedUser}
                        onChange={async (e) =>{
                          const userId=e.target.value;
                          if(!userId){
                            return;
                          }
                          await addUserToPage(item._id, e.target.value)
                          setSelectedUser("");
                        }}
                        className="border rounded border-blue-400 p-2 w-32 sm:w-40 md:w-40 text-sm focus:outline-none"
                      >
                        <option value="" className="justify-between border-b">Add User</option>
                        {Array.isArray(users)&&users.map((u) => (
                          <option key={u._id} value={u._id}>
                            {u.username}   |   {u.role}
                          </option>
                        ))}
                      </select>
                    )}
                    {/* Delete page */}
                    {(user?.role === "ADMIN" || user?.role === "OWNER") && (
                      <button
                        className="p-2 bg-red-500 rounded hover:bg-red-600 text-white hover:scale-105"
                        onClick={() =>{ setSelectedPageId(item._id); setOpenDelete(true)}}
                      >
                        Delete
                      </button>
                    )}
                    {(user?.role === "ADMIN" || user?.role === "OWNER"||user?.role === "MANAGER") && (<button className="p-2 bg-green-600 rounded hover:bg-green-700 text-white hover:scale-105"
                      onClick={() =>{ setSelectedPage(item); setOpenUpdate(true)}}>
                      Update
                    </button>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Page available.</p>
      )}

      {/* <div className="flex justify-center gap-2 border-t border-gray-400 p-2">
        <button
          className="px-4 py-2 rounded bg-gray-100"
          // onClick={() => setSelected(false)}
        >
          Cancel
        </button>
      </div> */}
      {openDelete &&selectedPageId &&(
        <DeletePage setOpenDelete={setOpenDelete} pageId={selectedPageId} handleDelete={handleDelete}/>
      )}
      {openUpdate &&selectedPage &&(
        <UpdatePage setOpenUpdate={setOpenUpdate} page={selectedPage} refreshPages={fetchPage}/>
      )}
    </div>
  );
}
