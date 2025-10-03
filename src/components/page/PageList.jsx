import { addUsersToPage, deletePageData, getPages, getUsers } from "../../api/Login";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DeletePage } from "./DeletePage";

export function PageList() {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log("Logged In User:", user);
  const [selectedPageId, setSelectedPageId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);


  const getPage = async () => {
    setLoading(true);
    try {
      const data = await getPages();
      console.log("Data", data);
      setPages(data || []);
    } catch (err) {
      toast.error("Failed to load insights");
    } finally {
      setLoading(false);
    }
  };

  //fetchUsers
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      console.log("Data of users", data);
      setUsers(data || []);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const addUserToPage = async (pageId, userId) => {
    if (!userId) return;
    try {
      await addUsersToPage(pageId, userId);
      getUsers();
    } catch (err) {
      toast.error("Failed to add user");
    }
  };

   //delete a user
    const handleDelete = async (pageId) => {
      try {
        await deletePageData(pageId);
        setOpenDelete(false);
        setSelectedPageId("");
        getPage();
      } catch (error) {
        toast.error(error.message);
      }
    };

  useEffect(() => {
    getPage();
    getAllUsers();
  }, []);
  return (
    <div className="w-[500px]">
      <div className=" mb-4 border-b border-gray-400 p-2">
        <h2 className="text-lg font-semibold ">Pages</h2>
      </div>

      {loading ? (
        <p className="text-center m-4">Loading Available Pages...</p>
      ) : pages ? (
        <div className=" space-y-2 mt-3 border border-gray-300 ">
          <table className="border-collapse w-full rounded-lg">
            <thead className="bg-gray-50 text-blue-600">
              <tr>
                <th className="border px-2 py-1">Pages</th>
              </tr>
            </thead>
            <tbody>
              {pages?.data?.pages?.map((item) => (
                <tr
                  key={item._id}
                  className="flex border p-3 rounded justify-between hover:bg-gray-100"
                >
                  <td>
                    <h1 className="font-semibold text-gray-800 mr-2 text-sm">
                      {item.page_name}
                    </h1>
                    <h2 className="font-semibold text-gray-500 mr-2 text-sm">
                      {item.page_id}
                    </h2>
                  </td>
                  <td>
                    <button
                      className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white ml-auto hover:scale-105"
                      onClick={() => {
                        sessionStorage.setItem("fb_page_id", item.page_id);
                        sessionStorage.setItem(
                          "fb_access_token",
                          item.access_token
                        );
                        navigate(`/${item.page_id}/home`);
                      }}
                    >
                      View
                    </button>
                    {/* add users to page */}
                    {user?.role === "ADMIN" && (
                      <select
                        onChange={(e) =>
                          addUserToPage(item._id, e.target.value)
                        }
                        className="border rounded border-blue-400 p-2 ml-2 w-[120px]"
                      >
                        <option value="" className="justify-between border-b">Add User</option>
                        {users.map((u) => (
                          <option key={u._id} value={u._id}>
                            {u.username}   |   {u.role}
                          </option>
                        ))}
                      </select>
                    )}
                    {/* Delete page */}
                    {user?.role === "ADMIN" && (
                      <button
                        className="p-2 m-2 bg-blue-600 rounded hover:bg-blue-700 text-white hover:scale-105 w-fit"
                        onClick={() =>{ setSelectedPageId(item._id); setOpenDelete(true)}}
                      >
                        Delete
                      </button>
                    )}
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
    </div>
  );
}
