import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Modal } from "../modal/Modal";
import { toast } from "react-toastify";
import { createCampaign } from "../../api/CampaignEndpoints";

export function CreateCampaigns({ setSelected, refreshCampaign }) {
  const [name, setName] = useState("");
  const [objective, setObjective] = useState("");
  const [adCategory, setAdCategory] = useState("");
  const [status, setStatus] = useState("");
  const [buyingType, setBuyingType] = useState("");

  const handleCreate = async () => {
    try {
      await createCampaign(name, objective, adCategory, status,buyingType);
      toast.success("Campaign created successfully");
      refreshCampaign();
      setSelected(false);
      setName("");
      setObjective("");
      setAdCategory("");
      setStatus("");
      setBuyingType("");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Modal onClose={() => setSelected(false)}>
      <div className="w-[300px] mx-auto sm:w-[400px] md:w-[400px] lg:w-[400px]">
        <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Create Campaign
          </h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer text-white text-sm sm:text-base"
            onClick={() => setSelected("")}
          />
        </div>
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

        <label className="font-bold mb-1 text-white text-sm sm:text-base">
          Objective :
        </label>
        <select
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded text-sm sm:text-base"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          required
        >
          <option value="">Select Objective</option>
          <option value="OUTCOME_LEADS">LEADS</option>
          <option value="OUTCOME_SALES">SALES</option>
          <option value="OUTCOME_ENGAGEMENT">ENGAGEMENT</option>
          <option value="OUTCOME_AWARENESS">AWARENESS</option>
          <option value="OUTCOME_TRAFFIC">OUTCOME_TRAFFIC</option>
          <option value="OUTCOME_APP_PROMOTION">OUTCOME_APP_PROMOTION</option>
        </select>

        <label className="font-bold mb-1 text-white text-sm sm:text-base">
          Ad Category :
        </label>
        <select
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded text-sm sm:text-base"
          value={adCategory}
          onChange={(e) => setAdCategory(e.target.value)}
          required
        >
          <option value="">Select Ad Category</option>
          <option value="HOUSING">HOUSING</option>
          <option value="FINANCIAL_PRODUCTS_SERVICES">
            FINANCIAL PRODUCTS SERVICES
          </option>
          <option value="EMPLOYMENT">EMPLOYMENT</option>
          <option value="ISSUES_ELECTIONS_POLITICS">
            ISSUES ELECTIONS POLITICS
          </option>
          <option value="NONE">NONE</option>
        </select>

        <label className="font-bold mb-1 text-white text-sm sm:text-base">
          Status :
        </label>
        <select
          // type="text"
          // placeholder="Enter role"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded text-sm sm:text-base"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select Status</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="PAUSED">PAUSED</option>
        </select>

        <label className="font-bold mb-1 text-white text-sm sm:text-base">
          Buying Type :
        </label>
        <select
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded text-sm sm:text-base"
          value={buyingType}
          onChange={(e) => setBuyingType(e.target.value)}
          required
        >
          <option value="">Select Buying Type</option>
          <option value="AUCTION">AUCTION</option>
          <option value="RESERVED">RESERVED</option>
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
