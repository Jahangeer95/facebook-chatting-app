import { deleteUser, getUsers, updateUserRole } from "../../api/Login";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function Users() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log("Logged In User:", user);

  const getUser = async () => {
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
  useEffect(() => {
    getUser();
  }, []);

  //delete a user
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      getUser();
    } catch (error) {
      toast.error(error.message);
    }
  };

  //update user role
  const handleUpdate = async (userId,role) => {
    try {
      await updateUserRole(userId,role);
      getUser();
    } catch (error) {
      toast.error(error.message || "Failed to update role of user");
    }
  };
  return (
    <div className="w-full">
      <div className="mb-4 border-b border-gray-400 p-2">
        <h2 className="text-lg font-semibold ">Users</h2>
      </div>

      {loading ? (
        <p className="text-center m-4">Loading Available Users...</p>
      ) : users ? (
        <div className=" space-y-2 mt-3 border border-gray-300">
          <table className="border-collapse  w-full rounded-lg">
            <thead className="bg-gray-50 text-blue-600">
              <tr>
                <th className="border px-2 py-1">Username</th>
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">Role</th>
                <th className="border px-2 py-1">Pages</th>
                <th className="border px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr
                  key={item._id}
                  className="border  rounded hover:bg-gray-100"
                >
                  <td className="px-2 py-2 text-sm border">{item.username}</td>
                  <td className="px-2 py-2 text-sm border">{item.email}</td>
                  <td className="px-2 py-2 text-sm border">
                    {item.role}
                    {(user?.role === "ADMIN" || user?.role === "MANAGER") && (
                      <select
                        onChange={(e) =>
                          handleUpdate(item._id, e.target.value)
                        }
                        className="border rounded border-blue-400 p-2 ml-2 w-[100px]"
                      >
                        <option value="">UPDATE</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="MODERATOR">MODERATOR</option>
                        <option value="EDITOR">EDITOR</option>
                      </select>
                    )}
                  </td>
                  <td className="px-2 py-2 text-sm border">
                    {/* user pages */}
                    {item.pages.length > 0
                      ? item.pages.map((page) => (
                          <div key={page._id}>
                            <p className="font-semibold"> {page.page_name}</p>
                          </div>
                        ))
                      : "No pages"}
                  </td>
                  <td>
                    {user?.role === "ADMIN" && (
                      <button
                        className="p-2 m-2 bg-blue-600 rounded hover:bg-blue-700 text-white hover:scale-105 w-fit"
                        onClick={() => handleDelete(item._id)}
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
    </div>
  );
}
