import { useEffect, useState } from "react";
import { fetchPageDetail, updatePageDetails } from "../../api";
import { toast } from "react-toastify";

export function PageDetails({ formatName }) {
  const [pageInfo, setPageInfo] = useState(null);
  const [settingLoading, setSettingLoading] = useState(false);

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
      console.error("Page information failed to load", err);
      toast.error("Page information failed to load");
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
  return (
    <div className="w-[600px] ml-10">
      <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
        <h1 className="text-2xl font-semibold text-blue-700">Page Details</h1>
      </div>

      {settingLoading ? (
        <p className="text-center m-4 text-blue-600">
          Loading Page Information...
        </p>
      ) : pageInfo ? (
        <div className="space-y-2 ml-10">
          <table className="border-collapse border border-gray-300 w-full shadow">
            <thead className="bg-gray-200 text-blue-600">
              <tr>
                <th>Information</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(pageInfo).map(([item, value], index) => (
                <tr key={index} className="border-b mb-10">
                  <td className="border px-2 py-1 font-semibold">
                    {formatName(item)}
                  </td>
                  <td className="border px-2 py-1 flex">
                    {["about", "description", "phone", "website"].includes(
                      item
                    ) ? (
                      <>
                        <input
                          type="text"
                          defaultValue={value}
                          className="border border-gray-400 w-full p-1"
                          onBlur={(e) => updateDetails([item, e.target.value])}
                        />
                      </>
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
