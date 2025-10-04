import { useEffect, useState } from "react";
import { getUserDetail } from "../../api/Login";
import { toast } from "react-toastify";

export function UserDetail() {
  const [loading, setLoading] = useState(false);
  const [user, setUsers] = useState(null);
  const userId = localStorage.getItem("user_id");
  const getUser = async () => {
    setLoading(true);
    try {
      const data = await getUserDetail(userId);
      console.log("User details", data);
      setUsers(data);
    } catch (err) {
      toast.error("Failed to load user detail");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="w-[500px] mt-6 mb-5 mx-auto">
      <div className="mb-4 border-b border-gray-400 p-2">
        <h2 className="text-xl font-bold text-blue-600">Current User</h2>
      </div>
      {loading ? (
        <p className="text-center m-4 text-gray-500">Loading User Details...</p>
      ) : user ? (
        <div className="space-y-3 mt-3 border border-gray-300 rounded-md">
          <table className="w-full border-collapse rounded-md">
            <thead className="bg-gray-50 text-blue-600">
              <tr>
                <th className="px-4 py-2 text-center border">User Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3">
                  <span className="font-semibold">Username:</span>
                  {user.username}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <span className="font-semibold">Email:</span> {user.email}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <span className="font-semibold">Role:</span> {user.role}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No Details available.</p>
      )}
    </div>
  );
}
