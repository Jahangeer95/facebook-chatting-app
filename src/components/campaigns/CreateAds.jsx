import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Modal } from "../modal/Modal";
import { toast } from "react-toastify";
import { createAd} from "../../api/CampaignEndpoints";

export function CreateAds({ setSelected, adset, creatives ,refreshAds, hasMoreAdsets, hasMoreCreatives}) {
  const [name, setName] = useState("");
  const [adsetId, setAdsetID] = useState("");
  const [adCreativeId, setAdCreativeId] = useState("");
  const [status, setStatus] = useState("");

  const handleCreate = async () => {
    try {
      await createAd(name,adsetId,adCreativeId,status);
      toast.success("Campaign created successfully");
      refreshAds();
      setSelected(false);
      setName("");
      setAdsetID("");
      setAdCreativeId("");
      setStatus("");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Modal onClose={() => setSelected(false)}>
      <div className="w-[300px] mx-auto sm:w-[400px] md:w-[400px] lg:w-[400px]">
        <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Create Ad
          </h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer text-white text-sm sm:text-base"
            onClick={() => setSelected("")}
          />
        </div>
        {/* name */}
        <label className="font-bold mb-1 text-white text-sm sm:text-base">
          Name :
        </label>
        <input
          type="text"
          placeholder="Enter name of campaign"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* adsetid */}
        <label className="font-bold text-white text-sm sm:text-base">
          Adset :
        </label>
        <select
          className="px-2 py-1 mb-3 border block w-full mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded text-sm sm:text-base"
          value={adsetId}
          onChange={(e) => {const value=e.target.value;if(value==="loadMore"){hasMoreAdsets()}else{setAdsetID(value)}}}
          required
        >
          <option value="">Select Adset</option>
          {Array.isArray(adset) &&
            adset.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
            {hasMoreAdsets&&(<option value="loadMore" className="text-sm text-gray-500 text-center">Load More</option>)}
        </select>

        {/* adcreativeid */}
        <label className="font-bold text-white text-sm sm:text-base">
          Ad Creative :
        </label>
        <select
          className="px-2 py-1 mb-3 border block w-full mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded text-sm sm:text-base"
          value={adCreativeId}
          onChange={(e) => {const value=e.target.value; if(value==="loadMore"){hasMoreCreatives()}else{setAdCreativeId(value)}}}
          required
        >
          <option value="">Select Creative</option>
          {Array.isArray(creatives) &&
            creatives.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
            {hasMoreCreatives&&(<option value="loadMore" className="text-sm text-gray-500 text-center">Load More</option>)}
        </select>

        {/* status */}
        <label className="font-bold mb-1 text-white text-sm sm:text-base">
          Status :
        </label>
        <select
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded text-sm sm:text-base"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select Status</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="PAUSED">PAUSED</option>
        </select>

        

        <div className="flex flex-col sm:flex-row justify-center gap-2 border-t border-gray-400 p-2">
          <button
            className="px-7 py-2 rounded bg-gray-300 w-full sm:w-auto hover:bg-gray-400 transition"
            onClick={() => setSelected(false)}
          >
            Cancel
          </button>
          <button
            className="px-7 py-2 rounded bg-blue-600 text-white w-full sm:w-auto hover:bg-blue-700 transition"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
}
