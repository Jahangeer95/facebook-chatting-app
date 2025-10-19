import { useCallback, useEffect, useState } from "react";
import { CreateCampaigns } from "./CreateCampaign";
import { toast } from "react-toastify";
import { getCampaigns } from "../../api/CampaignEndpoints";
import { CampaignsList } from "./CampaignsList";
// import { CreateAdsets } from "./CreateAdsets";

export function Campaigns() {
  const [selected, setSelected] = useState("");
  const [campaigns, setcampaigns] = useState([]);
  const [selectedType, setSelectedType] = useState("campaign");
  const [campaignsLoading, setCampaignsLoading] = useState(false);
  const [paging, setPaging] = useState(null);

  const getCampaign = useCallback(async () => {
    setCampaignsLoading(true);
    try {
      const {data,paging} = await getCampaigns();
      console.log("Data", data);
      setcampaigns(data || []);
      setPaging(paging);
    } catch (err) {
      toast.error("Failed to load insights");
    }finally {
      setCampaignsLoading(false);
    }
  }, []);
  useEffect(() => {
    getCampaign();
  }, [getCampaign]);

  const hasMoreCampaigns = useCallback(async () => {
    if (!paging?.next) {
      return;
    }
    try {
      const res = await fetch(paging.next);
      const data = await res.json();
      const newCampaigns = data?.data || [];
      const newPaging = data?.paging || null;
      setcampaigns((prev) => {
        const newReplies = [...prev, ...newCampaigns];
        return Array.from(new Map(newReplies.map((r) => [r.id, r])).values());
      });

      setPaging(newPaging);
    } catch (err) {
      console.log("Failed to fetch more users", err);
      toast.error("Failed to fetch more users");
    }
  },[paging]);
  return (
    <div className="p-6 space-y-6 max-h-screen">
      {/* buttons */}
      <div className="flex gap-5 mb-4">
        <button
          className={`px-3 py-2 rounded hover:bg-blue-700 text-white  ${
            selectedType === "campaign" ? "bg-blue-600" : "bg-gray-400"
          }`}
          onClick={() => setSelectedType("campaign")}
        >
          Campaigns
        </button>
        <button
          className={`px-3 py-2 rounded hover:bg-blue-700 text-white  ${
            selectedType === "adsets" ? "bg-blue-600" : "bg-gray-400"
          }`}
          onClick={() => setSelectedType("adsets")}
        >
          Adsets
        </button>
        <button
          className={`px-3 py-2 rounded text-white ${
            selectedType === "ads" ? "bg-blue-600" : "bg-gray-400"
          }`}
          onClick={() => setSelectedType("ads")}
        >
          Ads
        </button>
      </div>
      
      {/* content */}
      <div className="border p-4 rounded bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {selectedType === "campaign"
              ? "Campaigns"
              : selectedType === "adsets"
              ? "Adsets"
              : "Ads"}
          </h2>
          {selectedType === "campaign" ? (
            <button
              className="px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
              onClick={() => setSelected("createCampaign")}
            >
              Create Campaigns
            </button>
          ) : selectedType === "adsets" ? (
            <button
              className="px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
              onClick={() => setSelected("createAdset")}
            >
              Create Adsets
            </button>
          ) : (
            <button
              className="px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
              onClick={() => setSelected("createCampaign")}
            >
              Create Ads
            </button>
          )}
        </div>

        {selected === "createCampaign" && (
          <div className="mb-4">
            <CreateCampaigns refreshCampaign={getCampaign} setSelected={setSelected} />
          </div>
        )}

        {selected === "createAdset" && (
          <div className="mb-4">
            <CreateCampaigns campaigns={campaigns} setSelected={setSelected} />
          </div>
        )}

        {selected === "createAds" && (
          <div className="mb-4">
            <CreateCampaigns setSelected={setSelected} />
          </div>
        )}
        {/* List to dispaly data */}
        {selectedType === "campaign" && <CampaignsList campaigns={campaigns} hasMoreCampaigns={hasMoreCampaigns} paging={paging} campaignsLoading={campaignsLoading} />}
        {selectedType === "adsets" && <CampaignsList campaigns={campaigns} />}
        {selectedType === "ads" && <CampaignsList campaigns={campaigns} />}
      </div>
    </div>
  );
}
