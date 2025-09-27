import { getUsers } from "../../api/Login";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function Users() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      console.log("Data of users", data);
      setUsers(data || []);
    } catch (err) {
      toast.error("Failed to load insights");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="w-[500px]">
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
                  <td className="px-2 py-2 text-sm border">{item.role}</td>
                  <td className="px-2 py-2 text-sm border">
                    {item.pages.length > 0
                      ? item.pages.map((page, index) => (
                          <div key={index}>{page}</div>
                        ))
                      : "No pages"}
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
