import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPages } from "../../api/Login";
import { Modal } from "../modal/Modal";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function PageList({ setSelected }) {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);

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
    <Modal onClose={() => setSelected(false)}>
      <div className="w-96">
        <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
          <h2 className="text-lg font-semibold text-white">Pages</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer text-white"
            onClick={() => setSelected(false)}
          />
        </div>

        {loading ? (
          <p className="text-white text-center m-4">
            Loading Available Pages...
          </p>
        ) : pages ? (
          <div className=" space-y-2 mt-3">
            {pages?.data?.pages?.map((item) => (
              <div
                key={item._id}
                className="flex border p-3 rounded bg-gray-50 mb-2"
              >
                <div>
                  <h1 className="font-semibold text-gray-800 mr-2 text-sm">
                    {item.page_name}
                  </h1>
                  <h2 className="font-semibold text-gray-500 mr-2 text-sm">
                    {item.page_id}
                  </h2>
                </div>

                <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white ml-auto">
                  View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No Page available.</p>
        )}

        <div className="flex justify-center gap-2 border-t border-gray-400 p-2">
          <button
            className="px-4 py-2 rounded bg-gray-100"
            onClick={() => setSelected(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
