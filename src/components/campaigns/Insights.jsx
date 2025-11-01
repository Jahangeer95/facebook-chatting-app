import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getInsight } from "../../api/CampaignEndpoints";

export function Insights() {
  const [insights, setInsights] = useState([]);
  const [level, setLevel] = useState("account");
  const [preset, setPreset] = useState("this_month");
  const [loading, setLoading] = useState(false);

  //fetch insights
  const getInsights = async (level, preset) => {
    setLoading(true);
    try {
      const data = await getInsight(level, preset);
      console.log("Data", data);
      setInsights(data || []);
    } catch (err) {
      toast.error("Failed to load insights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInsights(level, preset);
  }, [level, preset]);

  return (
    <div className="p-8 bg-white rounded-xl shadow-sm">
      <div className="flex flex-wrap gap-6 mb-8 justify-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Level
          </label>
          <select
            className="border border-gray-300 rounded-md p-2 w-40 focus:ring focus:ring-blue-200 focus:outline-none"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="account">Account</option>
            <option value="campaign">Campaign</option>
            <option value="adset">Adset</option>
            <option value="ad">Ad</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Preset
          </label>
          <select
            className="border border-gray-300 rounded-md p-2 w-48 focus:ring focus:ring-blue-200 focus:outline-none"
            value={preset}
            onChange={(e) => setPreset(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last_3d">Last 3 Days</option>
            <option value="last_7d">Last 7 Days</option>
            <option value="last_14d">Last 14 Days</option>
            <option value="last_28d">Last 28 Days</option>
            <option value="last_30d">Last 30 Days</option>
            <option value="this_week_sun_today">This Week (Sun-Today)</option>
            <option value="this_week_mon_today">This Week (Mon-Today)</option>
            <option value="last_week_sun_sat">Last Week (Sun-Sat)</option>
            <option value="last_week_mon_sun">Last Week (Mon-Sun)</option>
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
            <option value="this_quater">This Quater</option>
          </select>
        </div>
      </div>

      {/* data */}
      {loading ? (
        <p className="text-gray-500 italic">Loading insights...</p>
      ) : insights.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-blue-100 text-blue-600 text-sm">
              <tr>
                {Object.keys(insights[0]).map((key) => (
                  <th
                    key={key}
                    className="border px-2 py-2 font-semibold text-left"
                  >
                    {key.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {insights.map((item) => (
                <tr
                  key={
                    item.ad_id ||
                    item.adset_id ||
                    item.campaign_id ||
                    item.account_id
                  }
                  className="border rounded hover:bg-gray-50 text-xs"
                >
                  {Object.entries(item).map(([key,val]) => (
                    <td key={key} className="px-2 py-1 font-medium text-gray-800">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No insights found</p>
      )}
    </div>
  );
}
