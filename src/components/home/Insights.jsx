import { useEffect, useState } from "react";
import { getPageInsights } from "../../api";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faHeart,
  faThumbsUp,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
export function Insights({ formatName }) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState([]);

  const getInsights = async () => {
    setLoading(true);
    try {
      const response = await getPageInsights();
      setInsights(response);
    } catch (err) {
      toast.error("Failed to load insights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInsights();
  }, []);

  return (
    <div className="w-[500px] mb-5">
      <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
        <h1 className="text-2xl font-semibold text-blue-700">Page Insights</h1>
      </div>

      {loading ? (
        <p className="text-center m-4 text-blue-600 h-[180px]">
          Loading insights...
        </p>
      ) : insights?.data?.length > 0 ? (
        <div className=" mt-3 bg-gray-200 flex p-2 ">
          {insights.data.map((item) => (
            <div
              key={item.name}
              className="border p-2 rounded bg-white m-2  shadow"
            >
              <h1 className="font-semibold text-gray-800 mr-2 text-sm">
                {formatName(item.name)}
              </h1>
              <div className="flex items-center font-bold gap-10 mt-2">
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
                  <FontAwesomeIcon icon={faUsers} className="text-green-400" />
                )}
                <span className="font-bold ml-auto">
                  {item.values?.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center m-auto h-[180px]">No insights available.</p>
      )}
    </div>
  );
}
