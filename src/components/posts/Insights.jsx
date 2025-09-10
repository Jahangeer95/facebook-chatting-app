import { useEffect, useState } from "react";
import { getPostInsights } from "../../api";
import { toast } from "react-toastify";
import { Modal } from "../modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faHeart,
  faThumbsUp,
  faTimes,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export function Insights({ postId, setOpenInsights }) {
  const [insights, setInsights] = useState([]);
  const [timePeriod, setTimePeriod] = useState("lifetime");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getInsights = async (timePeriod) => {
      setLoading(true);
      try {
        const data = await getPostInsights(postId, timePeriod);
        console.log("Data", data);
        setInsights(data || []);
      } catch (err) {
        toast.error("Failed to load insights");
      } finally {
        setLoading(false);
      }
    };
    if (postId) {
      getInsights(timePeriod);
    }
  }, [timePeriod, postId]);

  function formatName(name) {
    const title = name.split("_").join(" ");
    return title.charAt(0).toUpperCase() + title.slice(1);
  }
  return (
    <Modal onClose={() => setOpenInsights(false)}>
      <div className="w-96">
        <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
          <h2 className="text-lg font-semibold text-white">Post Insights</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer text-white"
            onClick={() => setOpenInsights(false)}
          />
        </div>
        <div className="flex">
          <h1 className="text-white mr-4 ml-2 text-lg">Post Insights for </h1>
          <select
            className="p-1"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="lifetime">LifeTime</option>
          </select>
        </div>
        {loading ? (
          <p className="text-white text-center m-4">Loading insights...</p>
        ) : insights ? (
          <div className="space-y-2 mt-3">
            {insights?.data?.map((item) => (
              <div
                key={item.name}
                className="border p-3 rounded bg-gray-50 mb-2"
              >
                <h1 className="font-semibold text-gray-800 mr-2 text-sm">
                  {formatName(item.name)}
                </h1>
                <div className="flex items-center font-bold gap-10  mt-2">
                  {item.name === "post_reactions_like_total" && (
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="text-blue-700"
                    />
                  )}
                  {item.name === "post_reactions_love_total" && (
                    <FontAwesomeIcon icon={faHeart} className="text-red-600" />
                  )}
                  {item.name === "post_reactions_wow_total" && (
                    <FontAwesomeIcon
                      icon={faFaceSmile}
                      className="text-yellow-500"
                    />
                  )}
                  {item.name === "post_impressions_unique" && (
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="text-green-400"
                    />
                  )}
                  <span className="font-bold ml-auto">
                    {item.values && item.values.length === 2
                      ? Math.abs(item.values[1].value - item.values[0].value)
                      : item.values?.[0]?.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No insights available.</p>
        )}

        <div className="flex justify-center gap-2 border-t border-gray-400 p-2">
          <button
            className="px-4 py-2 rounded bg-gray-300"
            onClick={() => setOpenInsights(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
