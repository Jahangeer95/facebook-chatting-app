import { useCallback, useEffect, useState } from "react";
import { CreateCampaigns } from "./CreateCampaign";
import { toast } from "react-toastify";
import {
  fetchAds,
  fetchAdset,
  getAdCreatives,
  getCampaigns,
} from "../../api/CampaignEndpoints";
import { CampaignsList } from "./CampaignsList";
import { CreateAdsets } from "./CreateAdsets";
import { CreateAdsCreatives } from "./CreateAdsCreatives";
import { AdCreativesList } from "./AdsCreativesList";
import { ViewAdsets } from "./ViewAdsets";
import { CreateAds } from "./CreateAds";
import { Insights } from "./Insights";
import { AdsList } from "./AdsList";

export function Campaigns() {
  const [selected, setSelected] = useState("");
  const [campaigns, setcampaigns] = useState([]);
  const [selectedType, setSelectedType] = useState("campaign");
  const [campaignsLoading, setCampaignsLoading] = useState(false);
  const [paging, setPaging] = useState(null);
  const [creatives, setCreatives] = useState([]);
  const [creativesLoading, setCreativesLoading] = useState(false);
  const [creativePaging, setCreativePaging] = useState(null);
  const [adset, setAdsets] = useState([]);
  const [adsetLoading, setAdsetLoading] = useState(false);
  const [adsetPaging, setAdsetPaging] = useState(null);
  const [ads, setAds] = useState([]);
  const [adsLoading, setAdsLoading] = useState(false);
  const [adsPaging, setAdsPaging] = useState(null);

  const getCampaign = useCallback(async () => {
    setCampaignsLoading(true);
    try {
      const { data, paging } = await getCampaigns();
      console.log("Data", data);
      setcampaigns(data || []);
      setPaging(paging);
    } catch (err) {
      toast.error("Failed to load insights");
    } finally {
      setCampaignsLoading(false);
    }
  }, []);
  //fetch creatives
  const getCreatives = useCallback(async () => {
    setCreativesLoading(true);
    try {
      const { data, paging } = await getAdCreatives();
      console.log("Data", data);
      setCreatives(data || []);
      setCreativePaging(paging);
    } catch (err) {
      toast.error("Failed to load creatives");
    } finally {
      setCreativesLoading(false);
    }
  }, []);

  //fetch adsets
  const getAdset = useCallback(async () => {
    setAdsetLoading(true);
    try {
      const { data, paging } = await fetchAdset();
      console.log("Data", data);
      setAdsets(data || []);
      setAdsetPaging(paging);
    } catch (err) {
      toast.error("Failed to load Adsets");
    } finally {
      setAdsetLoading(false);
    }
  }, []);

  //get ads
  const getAds = useCallback(async () => {
    setAdsLoading(true);
    try {
      const { data, paging } = await fetchAds();
      console.log("Data", data);
      setAds(data || []);
      setAdsPaging(paging);
    } catch (err) {
      toast.error("Failed to load Ads");
    } finally {
      setAdsLoading(false);
    }
  }, []);

  useEffect(() => {
    getCampaign();
    getCreatives();
    getAdset();
    getAds();
  }, [getCampaign, getCreatives, getAdset,getAds]);

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
      console.log("Failed to fetch more campaigns", err);
      toast.error("Failed to fetch more campaigns");
    }
  }, [paging]);

  //to load more creatives
  const hasMoreCreatives = useCallback(async () => {
    if (!creativePaging?.next) {
      return;
    }
    try {
      const res = await fetch(creativePaging.next);
      const data = await res.json();
      const newCreatives = data?.data || [];
      const newPaging = data?.paging || null;
      setCreatives((prev) => {
        const newReplies = [...prev, ...newCreatives];
        return Array.from(new Map(newReplies.map((r) => [r.id, r])).values());
      });

      setCreativePaging(newPaging);
    } catch (err) {
      console.log("Failed to fetch more creatives", err);
      toast.error("Failed to fetch more creatives");
    }
  }, [creativePaging]);

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

  //pagination for ads
  const hasMoreAds = useCallback(async () => {
    if (!adsPaging?.next) {
      return;
    }
    try {
      const res = await fetch(adsPaging.next);
      const data = await res.json();
      const newAds = data?.data || [];
      const newPaging = data?.paging || null;
      setAds((prev) => {
        const newReplies = [...prev, ...newAds];
        return Array.from(new Map(newReplies.map((r) => [r.id, r])).values());
      });

      setAdsPaging(newPaging);
    } catch (err) {
      console.log("Failed to fetch more adsets", err);
      toast.error("Failed to fetch more adsets");
    }
  }, [adsPaging]);
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
          className={`px-3 py-2 rounded hover:bg-blue-700 text-white ${
            selectedType === "ads" ? "bg-blue-600" : "bg-gray-400"
          }`}
          onClick={() => setSelectedType("ads")}
        >
          Ads
        </button>
        <button
          className={`px-3 py-2 rounded hover:bg-blue-700 text-white ${
            selectedType === "adscreatives" ? "bg-blue-600" : "bg-gray-400"
          }`}
          onClick={() => setSelectedType("adscreatives")}
        >
          AdsCreatives
        </button>

        <button
          className={`px-3 py-2 rounded hover:bg-blue-700 text-white ${
            selectedType === "insights" ? "bg-blue-600" : "bg-gray-400"
          }`}
          onClick={() => setSelectedType("insights")}
        >
          Insights
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
              : selectedType === "ads"
              ? "Ads"
              : selectedType === "adscreatives"
              ? "Adscreatives"
              : "Insights"}
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
          ) : selectedType === "ads" ? (
            <button
              className="px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
              onClick={() => setSelected("createAds")}
            >
              Create Ads
            </button>
          ) : selectedType === "adscreatives" ? (
            <button
              className="px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
              onClick={() => setSelected("adscreatives")}
            >
              Create AdsCreatives
            </button>
          ):("")}
        </div>

        {selected === "createCampaign" && (
          <div className="mb-4">
            <CreateCampaigns
              refreshCampaign={getCampaign}
              setSelected={setSelected}
            />
          </div>
        )}

        {selected === "createAdset" && (
          <div className="mb-4">
            <CreateAdsets campaigns={campaigns} setSelected={setSelected} refreshAdsets={getAdset} hasMoreCampaigns={hasMoreCampaigns}/>
          </div>
        )}

        {selected === "createAds" && (
          <div className="mb-4">
            <CreateAds
              setSelected={setSelected}
              adset={adset}
              creatives={creatives}
              refreshAds={getAds}
              hasMoreAdsets={hasMoreAdsets}
              hasMoreCreatives={hasMoreCreatives}
            />
          </div>
        )}

        {selected === "adscreatives" && (
          <div className="mb-4">
            <CreateAdsCreatives
              setSelected={setSelected}
              refreshCreatives={getAdCreatives}
            />
          </div>
        )}
        {/* List to dispaly data */}
        {selectedType === "campaign" && (
          <CampaignsList
            campaigns={campaigns}
            hasMoreCampaigns={hasMoreCampaigns}
            paging={paging}
            campaignsLoading={campaignsLoading}
            refreshCampaign={getCampaign}
          />
        )}
        {selectedType === "adsets" && (
          <ViewAdsets
            adsets={adset}
            hasMoreAdsets={hasMoreAdsets}
            paging={adsetPaging}
            adsetsLoading={adsetLoading}
            refreshAdsets={getAdset}
          />
        )}
        {selectedType === "ads"&&(
           <AdsList
           ads={ads}
           hasMoreAds={hasMoreAds}
           paging={adsPaging}
           adsLoading={adsLoading}
           refreshAds={getAds}
         />
        )}
        {selectedType === "adscreatives" && (
          <AdCreativesList
            creatives={creatives}
            hasMoreCreatives={hasMoreCreatives}
            paging={creativePaging}
            creativesLoading={creativesLoading}
            refreshCreatives={getCreatives}
          />
        )}

        {selectedType === "insights" && (
          <Insights/>
        )}
      </div>
    </div>
  );
}
