import { getPages } from "../../api/Login";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function PageList() {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

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
  useEffect(() => {
    getPage();
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
                      localStorage.setItem("fb_page_id",item.page_id)
                      localStorage.setItem("fb_access_token",item.access_token)
                      navigate(`/${item.page_id}/home`)}}
                  >
                    View
                  </button>
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
    </div>
  );
}
