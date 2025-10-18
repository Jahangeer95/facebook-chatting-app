import { useCallback, useEffect, useState } from "react";
import { CreateCampaigns } from "./CreateCampaign";
import { toast } from "react-toastify";
import { getCampaigns } from "../../api/CampaignEndpoints";
import { CampaignsList } from "./CampaignsList";

export function Campaigns() {
  const [selected, setSelected] = useState("");
  const [campaigns, setcampaigns] = useState([]);
  const [selectedType, setSelectedType] = useState("campaign");

  const getCampaign = useCallback(async () => {
    try {
      const data = await getCampaigns();
      console.log("Data", data);
      setcampaigns(data || []);
    } catch (err) {
      toast.error("Failed to load insights");
    }
  }, []);
  useEffect(() => {
    getCampaign();
  }, [getCampaign]);

  return (
    <div className="p-6 space-y-6 max-h-screen">
      
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
              onClick={() => setSelected("createCampaign")}
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
            <CreateCampaigns setSelected={setSelected} />
          </div>
        )}

        {selected === "createAdsets" && (
          <div className="mb-4">
            <CreateCampaigns setSelected={setSelected} />
          </div>
        )}

        {selected === "createAds" && (
          <div className="mb-4">
            <CreateCampaigns setSelected={setSelected} />
          </div>
        )}
        {selectedType === "campaign" && <CampaignsList campaigns={campaigns} />}
        {selectedType === "adsets" && <CampaignsList campaigns={campaigns} />}
        {selectedType === "ads" && <CampaignsList campaigns={campaigns} />}
      </div>
    </div>
  );
}
