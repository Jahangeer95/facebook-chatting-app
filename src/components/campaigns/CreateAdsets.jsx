import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Modal } from "../modal/Modal";
import { toast } from "react-toastify";
import { createAdset } from "../../api/CampaignEndpoints";
import Select from "react-select";
import countryList from "react-select-country-list";
import { optimizationOptions } from "../../helper/OptimizationGoalsOptions";

export function CreateAdsets({ campaigns, setSelected }) {
  const [name, setName] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [dailyBudget, setDailyBudget] = useState("");
  const [status, setStatus] = useState("");
  const [bidStrategy, setBidStrategy] = useState("");
  const [optimizationGoal, setOptimizationGoal] = useState("");
  const [billingEvent, setBillingEvent] = useState("");
  const [countries, setCountries] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const options = countryList().getData();

  const handleCreate = async () => {
    try {
      const body = {
        name,
        campaign_id: campaignId,
        daily_budget: dailyBudget,
        status,
        bid_strategy: bidStrategy,
        optimization_goal: optimizationGoal,
        billing_event: billingEvent,
        targeting: {
          geo_locations: {
            countries: countries,
          },
        },
        start_time: startDate,
        end_time: endDate,
      };
      console.log(body);
      await createAdset(body);

      toast.success("Adset created successfully");
      setSelected(false);
      setName("");
      setCampaignId("");
      setDailyBudget("");
      setStatus("");
      setBidStrategy("");
      setBillingEvent("");
      setOptimizationGoal("");
      setCountries([]);
      setStartDate("");
      setEndDate("");
    } catch (error) {
      toast.error(error.message);
    }
  };

    //optimization goals  for selected campaign objective
    const selectedCampaign = campaigns.find((c) => c.id === campaignId);
    const availableOptimizations =
      optimizationOptions[selectedCampaign?.objective] || [];

  return (
    <Modal onClose={() => setSelected(false)}>
      <div className="w-[300px] mx-auto sm:w-[400px] md:w-[400px] lg:w-[400px]">
        <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Create Campaign Adset
          </h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer text-white text-sm sm:text-base"
            onClick={() => setSelected("")}
          />
        </div>

        <div className="h-[350px] md:h-[400px] overflow-y-auto">
          {/* name */}
          <label className="font-bold text-white text-sm sm:text-base">
            Name :
          </label>
          <input
            type="text"
            placeholder="Enter name of adset"
            className="px-2 py-1 mb-3 border block w-full mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* daily budget */}
          <label className="font-bold text-white text-sm sm:text-base">
            Daily Budget :
          </label>
          <input
            type="number"
            placeholder="Budget must be greater than 30000"
            className="px-2 py-1 mb-3 border block w-full mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded"
            value={dailyBudget}
            onChange={(e) => setDailyBudget(e.target.value)}
            required
          />

          {/* campaign id */}
          <label className="font-bold text-white text-sm sm:text-base">
            Campaign :
          </label>
          <select
            className="px-2 py-1 mb-3 border block w-full mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded text-sm sm:text-base"
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
            required
          >
            <option value="">Select Campaign</option>
            {Array.isArray(campaigns) &&
              campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>

          {/* bid strategy */}
          <label className="font-bold text-white text-sm sm:text-base">
            Bid Strategy :
          </label>
          <select
            className="px-2 py-1 mb-3 border block w-full mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded text-sm sm:text-base"
            value={bidStrategy}
            onChange={(e) => setBidStrategy(e.target.value)}
            required
          >
            <option value="">Select Bid Strategy</option>
            <option value="LOWEST_COST_WITHOUT_CAP">
              LOWEST COST WITHOUT CAP
            </option>
            <option value="LOWEST_COST_WITH_BID_CAP">
              LOWEST COST WITH BID CAP
            </option>
            <option value="COST_CAP">COST CAP</option>
            <option value="LOWEST_COST_WITH_MIN_ROAS">
              LOWEST COST WITH MIN ROAS
            </option>
            <option value="NONE">NONE</option>
          </select>

          {/* status */}
          <label className="font-bold text-white text-sm sm:text-base">
            Status :
          </label>
          <select
            className="px-2 py-1 mb-3 border block w-full mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded text-sm sm:text-base"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="PAUSED">PAUSED</option>
          </select>

          {/* optimization goal */}
          <label className="font-bold text-white text-sm sm:text-base">
            Optimization Goal :
          </label>
          <select
            className="px-2 py-1 mb-3 border block w-full mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded text-sm sm:text-base"
            value={optimizationGoal}
            onChange={(e) => setOptimizationGoal(e.target.value)}
            required
            placeholder=" (Choose Campaign First)"
            disabled={!campaignId}
          >
            <option value="">Select Goal (Choose Campaign First)</option>
            {availableOptimizations.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
          </select>

          {/* billing event */}
          <label className="font-bold text-white text-sm sm:text-base">
            Billing Event :
          </label>
          <select
            className="px-2 py-1 mb-3 border block w-full mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded text-sm sm:text-base"
            value={billingEvent}
            onChange={(e) => setBillingEvent(e.target.value)}
            required
          >
            <option value="">Select Billing Event</option>
            <option value="CLICKS">CLICKS</option>
            <option value="IMPRESSIONS">IMPRESSIONS</option>
            <option value="LINK_CLICKS">LINK CLICKS</option>
            <option value="OFFER_CLAIMS">OFFER CLAIMS</option>
            <option value="PAGE_LIKES">PAGE LIKES</option>
            <option value="POST_ENGAGEMENT">POST ENGAGEMENT</option>
            <option value="THRUPLAY">THRUPLAY</option>
            <option value="LISTING_INTERACTION">LISTING INTERACTION</option>
            <option value="APP_INSTALLS">APP INSTALLS</option>
            <option value="PURCHASE">PURCHASE</option>
          </select>

          {/* target countries */}
          <label className="font-bold mb-1 text-white text-sm sm:text-base">
            Target Countries :
          </label>
          <Select
            options={options}
            isMulti
            value={options.filter((option) => countries.includes(option.value))}
            onChange={(selected) => setCountries(selected.map((c) => c.value))}
            className="mb-3 text-black"
            placeholder="Select target countries"
          />

          {/* start and end dates */}
          <label className="font-bold text-white text-sm sm:text-base">
            Start Date :
          </label>
          <input
            type="datetime-local"
            className="px-2 py-1 mb-3 border block w-full mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label className="font-bold text-white text-sm sm:text-base">
            End Date :
          </label>
          <input
            type="datetime-local"
            className="px-2 py-1 mb-3 border block w-full mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

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
