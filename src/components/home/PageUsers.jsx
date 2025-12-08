import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getPageRoles } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export function PageUsers({ formatName }) {
  const [rolesLoading, setRolesLoading] = useState(false);
  const [pageRoles, setPageRoles] = useState([]);
  const [paging, setPaging] = useState(null);
  const hasfetched = useRef(false);
  const getRoles = async () => {
    setRolesLoading(true);
    try {
      const { roles, paging } = await getPageRoles();
      setPageRoles(roles);
      setPaging(paging);
    } catch (err) {
      if (!hasfetched.current) {
        toast.error(
          <div>
            <strong>Page Roles</strong> {err.message}
          </div>
        );
      }
    } finally {
      setRolesLoading(false);
      hasfetched.current = true;
    }
  };

  useEffect(() => {
    if (!hasfetched.current) {
      getRoles();
    }
  }, []);

  const hasMoreRoles = async () => {
    if (!paging?.next) {
      return;
    }
    try {
      const res = await fetch(paging.next);
      const data = await res.json();
      const newRoles = data?.data || [];
      const newPaging = data?.paging || null;
      setPageRoles((prev) => {
        const newReplies = [...prev, ...newRoles];
        return Array.from(new Map(newReplies.map((r) => [r.id, r])).values());
      });

      setPaging(newPaging);
    } catch (err) {
      console.log("Failed to fetch more users", err);
      toast.error("Failed to fetch more users");
    }
  };

  return (
    <div className="w-full md:max-w-[500px] rounded-lg shadow p-3">
      <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
        <h1 className="text-xl sm:text-2xl font-semibold text-blue-700">
          Page Users
        </h1>
      </div>
      <div className="w-full mt-3 overflow-auto h-[200px]" id="scrollusers">
        <InfiniteScroll
          dataLength={pageRoles.length}
          next={hasMoreRoles}
          hasMore={!!paging?.next}
          loader={
            <div className="text-center p-4 text-sm text-gray-600">
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                size="lg"
                className="text-blue-700"
              />
            </div>
          }
          scrollableTarget="scrollusers"
        >
          {rolesLoading ? (
            <p className="text-center m-4 text-blue-600">Loading Roles...</p>
          ) : pageRoles.length > 0 ? (
            <div className=" shadow-md rounded-lg overflow-x-auto">
              <table className="border-collapse border border-gray-300 w-full text-sm sm:text-xs">
                <thead className="bg-blue-100 text-blue-600">
                  <tr>
                    <th className="border px-2 py-2">User Name</th>
                    <th className="border px-2 py-2">Tasks</th>
                    <th className="border px-2 py-2">is Active</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRoles.map((item) => (
                    <tr key={item.id} className="border">
                      <td className="px-4 py-2 font-bold text-gray-800">
                        <span>{item.name}</span>
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-600 border whitespace-pre-line">
                        {formatName(item.tasks.join("\n"))}
                      </td>
                      <td
                        className={`border px-2 py-1 ${
                          item.is_active
                            ? "text-green-600 font-bold"
                            : "text-red-600"
                        }`}
                      >
                        {item.is_active ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center m-auto">No Roles Available.</p>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}
