import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { UpdateCampaigns } from "./UpdateCampaign";
import { deleteCampaign, getAdsets } from "../../api/CampaignEndpoints";
import { toast } from "react-toastify";
import { AdsetsList } from "./AdsetsList";

export function CampaignsList({
  campaigns,
  hasMoreCampaigns,
  paging,
  campaignsLoading,
  refreshCampaign,
}) {
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedCampaignAd, setSelectedCampaignAd] = useState("");
  const [adset, setAdsets] = useState([]);
  const [adsetLoading, setAdsetLoading] = useState(false);
  const [adsetPaging, setAdsetPaging] = useState(null);
  //delete campaign
  const handleDelete = async (id) => {
    try {
      await deleteCampaign(id);
      toast.success("Campaign deleted successfully");
      refreshCampaign();
    } catch (error) {
      toast.error(error.message);
    }
  };
  //fetch adsets
  const getAdset = useCallback(async (campaignId) => {
    setAdsetLoading(true);
    try {
      const { data, paging } = await getAdsets(campaignId);
      console.log("Data", data);
      setAdsets(data || []);
      setAdsetPaging(paging);
    } catch (err) {
      toast.error("Failed to load Adsets");
    } finally {
      setAdsetLoading(false);
    }
  }, []);

  //pagination for adsets
  const hasMoreAdsets = useCallback(async () => {
    if (!adsetPaging?.next) {
      return;
    }
    try {
      const res = await fetch(adsetPaging.next);
      const data = await res.json();
      const newAdsets = data?.data || [];
      const newPaging = data?.paging || null;
      setAdsets((prev) => {
        const newReplies = [...prev, ...newAdsets];
        return Array.from(new Map(newReplies.map((r) => [r.id, r])).values());
      });

      setAdsetPaging(newPaging);
    } catch (err) {
      console.log("Failed to fetch more adsets", err);
      toast.error("Failed to fetch more adsets");
    }
  }, [adsetPaging]);

  if (selectedCampaignAd) {
    return (
      <div>
        <button
          className="px-2 py-2 bg-gray-400 text-white rounded hover:bg-blue-500 mb-4"
          onClick={() => setSelectedCampaignAd("")}
        >
           <FontAwesomeIcon icon={faArrowLeft}/>
        </button>

        <AdsetsList
          adsets={adset}
          hasMoreAdsets={hasMoreAdsets}
          paging={adsetPaging}
          adsetsLoading={adsetLoading}
          refreshAdsets={() => getAdset(selectedCampaignAd)}
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow-sm border border-gray-200 rounded-lg p-5 mt-10">
      <div className="w-full mt-3 overflow-auto h-[150px]" id="scrollCampaign">
        <InfiniteScroll
          dataLength={campaigns.length}
          next={hasMoreCampaigns}
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
          scrollableTarget="scrollCampaign"
        >
          {campaignsLoading ? (
            <p className="text-center m-4">Loading campaigns...</p>
          ) : campaigns?.length ? (
            <div className="overflow-x-auto space-y-2 mt-3 rounded-md w-full md:pl-5 ">
              <table className="min-w-full border-collapse rounded-md ">
                <thead className="bg-blue-100 text-blue-600">
                  <tr>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Name
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Status
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Objective
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Buying Type
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Ad Category
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Created Time
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Update
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Delete
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Adsets
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((item) => (
                    <tr
                      key={item.id}
                      className="border p-3 rounded hover:bg-gray-100 text-xs"
                    >
                      <td className="px-2 py-1 font-medium text-gray-800">
                        {item.name}
                      </td>
                      <td className="px-2 py-2 text-gray-600">{item.status}</td>
                      <td className="px-2 py-2 text-gray-600">
                        {item.objective.replace("_"," ")}
                      </td>
                      <td className="px-2 py-2 text-gray-600">
                        {item.buying_type}
                      </td>
                      <td className="px-2 py-2 text-gray-600">
                        {item.special_ad_categories}
                      </td>
                      <td className="px-2 py-2 text-gray-500">
                        {new Date(item.created_time).toLocaleString()}
                      </td>
                      {/* button to update campaign */}
                      <td className="px-2 py-2 text-gray-500">
                        <button
                          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                          onClick={() => setSelectedCampaign(item)}
                        >
                          Update
                        </button>
                      </td>
                      <td className="px-2 py-2 text-gray-500">
                        <button
                          className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td className="px-2 py-2 text-gray-500">
                        <button
                          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                          onClick={() => {setSelectedCampaignAd(item.id)
                            getAdset(item.id); 
                          }}
                        >
                          View Adsets
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No Campaign is available</p>
          )}
        </InfiniteScroll>
      </div>
      {/*calling update form */}
      {selectedCampaign && (
        <UpdateCampaigns
          selectedCampaign={selectedCampaign}
          setSelected={setSelectedCampaign}
          refreshCampaign={refreshCampaign}
        />
      )}
    </div>
  );
}
