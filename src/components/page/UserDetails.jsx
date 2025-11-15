import { useEffect, useState } from "react";
import { getUserDetail } from "../../api/Login";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export function UserDetail() {
  const [loading, setLoading] = useState(false);
  const [user, setUsers] = useState(null);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
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
    getUser();
  }, [userId]);

  function formatPermission(permission) {
    const name = permission
      .split("_")
      .map(
        (permissions) =>
          permissions.charAt(0).toUpperCase() + permissions.slice(1)
      )
      .join(" ");
    return name;
  }
  return (
    <div className="w-full max-w-md mt-6 mb-5 mx-auto px-3 sm:px-4 md:px-6">
      <div className="mb-4 border-b border-gray-400 p-2">
        <h2 className="text-xl font-bold text-blue-600 text-center sm:text-left">
          Current User
        </h2>
      </div>
      {loading ? (
        <p className="text-center m-4 text-gray-500">Loading User Details...</p>
      ) : user ? (
        <div className="space-y-3 mt-3 border border-gray-300 rounded-md shadow-sm">
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
              <tr>
                <td className="px-4 py-3 align-top">
                  <span className="font-semibold">Permissions:</span>
                  <div className="mt-3 space-y-3">
                    {Object.entries(user.permissions).map(
                      ([category, permission]) => (
                        <details
                          key={category}
                          className="border rounded-lg bg-gray-50 overflow-hidden shadow-sm group"
                        >
                          <summary className="cursor-pointer px-4 py-3 flex justify-between items-center hover-bg-gray-100">
                            <span className="font-semibold text-blue-600">
                              {category}
                            </span>
                            <FontAwesomeIcon
                              icon={faChevronDown}
                              className="transform transition-transform duration-200 group-open:rotate-180"
                            />
                          </summary>

                          <div className="px-4 py-3 bg-white border-t">
                            <ul className="ml-5 text-gray-700 space-y-1 list-disc">
                              {permission.map((permission)=>(<li key={permission}>{formatPermission(permission)}</li>))}</ul>
                          </div>
                        </details>
                      )
                    )}
                  </div>
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
