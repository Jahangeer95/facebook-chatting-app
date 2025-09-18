import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPageSettings, updatePageSettings } from "../../api";

export function Settings() {
  const [settingLoading, setSettingLoading] = useState(false);
  const [pageSetting, setPageSetting] = useState([]);
  const getSettings = async () => {
    setSettingLoading(true);
    try {
      const response = await getPageSettings();
      setPageSetting(response);
    } catch (err) {
      toast.error("Failed to load settings");
    } finally {
      setSettingLoading(false);
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  const updateSettings = async (setting, value) => {
    try {
      const val = String(value);
      await updatePageSettings(setting, val);
      await getSettings();
    } catch (err) {
      toast.error("Failed to update setting");
    }
  };

  return (
    <div className="w-[500px] mb-10 ">
      <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2 ">
        <h1 className="text-2xl font-semibold text-blue-700">Page Settings</h1>
      </div>

      {settingLoading ? (
        <p className="text-center m-4 text-blue-600">
          Loading Page Settings...
        </p>
      ) : pageSetting?.data?.length > 0 ? (
        <div className="space-y-2">
          <table className="border-collapse border border-gray-300 w-full shadow">
            <thead className="bg-gray-200 text-blue-600">
              <tr>
                <th>Settings</th>
              </tr>
            </thead>
            <tbody>
              {pageSetting?.data.map((item, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1 flex">
                    {item.setting.split("_").join(" ")}
                    {typeof item.value === "boolean" ? (
                      <input
                        type="checkbox"
                        checked={item.value === true}
                        className="ml-auto"
                        onChange={() =>
                          updateSettings(item.setting, !item.value)
                        }
                      />
                    ) : item.setting === "AGE_RESTRICTIONS" ? (
                      <select
                        className="ml-auto border rounded px-2 py-1"
                        value={item.value}
                        onChange={(e) =>
                          updateSettings(item.setting, e.target.value)
                        }
                      >
                        <option value="Public">Public</option>
                        <option value="People 17 and over">
                          People 17 and over
                        </option>
                        <option value="People 18 and over">
                          People 18 and over
                        </option>
                        <option value="People 19 and over">
                          People 19 and over
                        </option>
                        <option value="People 21 and over">
                          People 21 and over
                        </option>
                        <option value="Alcohol-Related">Alcohol-Related</option>
                      </select>
                    ) : item.setting === "PROFANITY_FILTER" ? (
                      <select
                        className="ml-auto border rounded px-2 py-1"
                        value={item.value}
                        onChange={(e) =>
                          updateSettings(item.setting, e.target.value)
                        }
                      >
                        <option value="Off">Off</option>
                        <option value="Medium">Medium</option>
                        <option value="Strong">Strong</option>
                      </select>
                    ) : (
                      <span className="ml-auto">{item.value}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center m-auto">No Settings Available.</p>
      )}
    </div>
  );
}
