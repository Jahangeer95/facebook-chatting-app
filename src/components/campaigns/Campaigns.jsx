import { useState } from "react";
import { CreateCampaigns } from "./CreateCampaign";

export function Campaigns() {
  const [selected, setSelected] = useState("");
  return (
    <div>
      Campaigns
      <button
        className="p-2 bg-blue-600 rounded hover:bg-blue-700 text-white hover:scale-105 w-fit"
        onClick={() => setSelected("create")}
      >
        Create Campaign
      </button>
      {selected === "create" && <CreateCampaigns setSelected={setSelected} />}
    </div>
  );
}
