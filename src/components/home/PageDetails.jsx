import { useEffect, useState } from "react";
import { fetchPageDetail, updatePageDetails } from "../../api";
import { toast } from "react-toastify";

export function PageDetails({ formatName }) {
  const [pageInfo, setPageInfo] = useState(null);
  const [settingLoading, setSettingLoading] = useState(false);
  const [editInfo, setEditInfo] = useState({});

  const getPageDetails = async () => {
    setSettingLoading(true);
    try {
      const res = await fetchPageDetail();
      setPageInfo(res.data.data);
      console.log("Page info", res.data);
      console.log(res.data.data.id);
      console.log(res.data.data.name);
      console.log(res.data.data.about);
    } catch (err) {
      console.error("Page Details failed to load", err);
      toast.error("Page Details failed to load");
    } finally {
      setSettingLoading(false);
    }
  };
  useEffect(() => {
    getPageDetails();
  }, []);

  const updateDetails = async (setting, value) => {
    try {
      // const val = String(value);
      await updatePageDetails(setting, value);
      await getPageDetails();
    } catch (err) {
      toast.error("Failed to update setting");
    }
  };

  const handleUpdate = async (setting, value) => {
    setEditInfo((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };
  return (
    <div className="w-full md:max-w-[500px]  rounded-lg shadow p-3 bg-white min-h-fit">
      <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
        <h1 className="text-xl sm:text-2xl font-semibold text-blue-700">Page Details</h1>
      </div>

      {settingLoading ? (
        <p className="text-center m-4 text-blue-600">
          Loading Page Information...
        </p>
      ) : pageInfo ? (
        <div className="space-y-2 overflow-x-auto rounded-lg ">
          <table className="border-collapse border border-gray-300 w-full shadow-sm text-sm sm:xs">
            <thead className="bg-blue-100 text-blue-600">
              <tr>
                <th className="border px-2 py-2">Information</th>
                <th className="border px-2 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(pageInfo).map(([item, value]) => (
                <tr key={item} className="">
                  <td className="border px-2 py-2 ">
                    {formatName(item)}
                  </td>
                  <td className="border px-2 py-2 flex">
                    {["about", "description", "phone", "website"].includes(
                      item
                    ) ? (
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center w-full">
                        <input
                          type="text"
                          defaultValue={value}
                          className="border border-blue-400 rounded-md w-full sm:w-[70%] p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
                          // onBlur={(e) => updateDetails([item, e.target.value])}
                          onChange={(e) => handleUpdate(item, e.target.value)}
                        />
                        <button
                          className="ml-[10px] p-1 bg-blue-600 rounded text-white"
                          onClick={() =>
                            updateDetails([item, editInfo[item] ?? value])
                          }
                        >
                          Update
                        </button>
                      </div>
                    ) : item === "link" ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <span>{value?.toString()}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center m-auto">No Detail Available</p>
      )}
    </div>
  );
}
