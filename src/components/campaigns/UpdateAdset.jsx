import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Modal } from "../modal/Modal";
import { toast } from "react-toastify";
import { updateAdset } from "../../api/CampaignEndpoints";
import Select from "react-select";
import countryList from "react-select-country-list";
import { optimizationOptions } from "../../helper/OptimizationGoalsOptions";

export function UpdateAdsets({
  campaigns,
  setSelected,
  selectedAdset,
  refreshAdsets,
}) {
  const options = countryList().getData();
  const [name, setName] = useState(selectedAdset?.name || "");
  const [campaignId, setCampaignId] = useState(
    selectedAdset?.campaign_id || ""
  );
  const [dailyBudget, setDailyBudget] = useState(
    selectedAdset?.daily_budget || ""
  );
  const [status, setStatus] = useState(selectedAdset?.status || "");
  const [bidStrategy, setBidStrategy] = useState(
    selectedAdset?.bid_strategy || ""
  );
  const [optimizationGoal, setOptimizationGoal] = useState(
    selectedAdset?.optimization_goal || ""
  );
  const [billingEvent, setBillingEvent] = useState(
    selectedAdset?.billing_event || ""
  );
  const [countries, setCountries] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (selectedAdset?.targeting?.geo_locations?.countries) {
      setCountries(selectedAdset.targeting.geo_locations.countries);
    }

    // converting time to valid datetime local format
    if (selectedAdset?.start_time) {
      setStartDate(selectedAdset.start_time.slice(0, 16));
    }
    if (selectedAdset?.end_time) {
      setEndDate(selectedAdset.end_time.slice(0, 16));
    }
  }, [selectedAdset]);

  const handleUpdate = async () => {
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

      await updateAdset(selectedAdset.id, body);

      toast.success("Adset updated successfully");
      refreshAdsets();
      setSelected(false);
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
      <div className="w-[300px] mx-auto sm:w-[400px]">
        <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Update Adset
          </h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer text-white text-sm sm:text-base"
            onClick={() => setSelected("")}
          />
        </div>

        <div className="h-[400px] overflow-y-auto">
          {/* name */}
          <label className="font-bold text-white text-sm">Name :</label>
          <input
            type="text"
            placeholder="Enter adset name"
            className="px-2 py-1 mb-3 border block w-full mt-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* daily budget */}
          <label className="font-bold text-white text-sm">Daily Budget :</label>
          <input
            type="number"
            className="px-2 py-1 mb-3 border block w-full mt-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={dailyBudget}
            onChange={(e) => setDailyBudget(e.target.value)}
          />

          {/* campaign */}
          <label className="font-bold text-white text-sm">Campaign :</label>
          <select
            disabled={selectedCampaign?.objective === "BRAND_AWARENESS"}
            className="px-2 py-1 mb-3 border block w-full mt-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
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
          <label className="font-bold text-white text-sm">Bid Strategy :</label>
          <select
            className="px-2 py-1 mb-3 border block w-full mt-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={bidStrategy}
            onChange={(e) => setBidStrategy(e.target.value)}
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
          <label className="font-bold text-white text-sm">Status :</label>
          <select
            className="px-2 py-1 mb-3 border block w-full mt-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="PAUSED">PAUSED</option>
          </select>

          {/* optimization goal */}
          <label className="font-bold text-white text-sm">
            Optimization Goal :
          </label>
          <select
            className="px-2 py-1 mb-3 border block w-full mt-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={optimizationGoal}
            onChange={(e) => setOptimizationGoal(e.target.value)}
          >
            <option value="">Select Goal (Choose Campaign first)</option>
            {availableOptimizations.map((goal) => (
              <option key={goal.value} value={goal.value}>
                {goal.label}
              </option>
            ))}
          </select>

          {/* billing event */}
          <label className="font-bold text-white text-sm">
            Billing Event :
          </label>
          <select
            className="px-2 py-1 mb-3 border block w-full mt-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={billingEvent}
            onChange={(e) => setBillingEvent(e.target.value)}
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

          {/* countries */}
          <label className="font-bold text-white text-sm">
            Target Countries :
          </label>
          <Select
            options={options}
            isMulti
            value={options.filter((opt) => countries.includes(opt.value))}
            onChange={(selected) => setCountries(selected.map((c) => c.value))}
            className="mb-3 text-black"
            placeholder="Select target countries"
          />

          {/* start & end date */}
          <label className="font-bold text-white text-sm">Start Date :</label>
          <input
            type="datetime-local"
            className="px-2 py-1 mb-3 border block w-full mt-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label className="font-bold text-white text-sm">End Date :</label>
          <input
            type="datetime-local"
            className="px-2 py-1 mb-3 border block w-full mt-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
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
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
}
