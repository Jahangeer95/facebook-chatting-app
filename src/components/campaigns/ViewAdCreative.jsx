import { useEffect, useState } from "react";
import { getAdCreativesPreview } from "../../api/CampaignEndpoints";
import { toast } from "react-toastify";

export function ViewAdCreative({ adcreativeId }) {
  const [preview, setPreview] = useState("");
  const [adFormat, setAdFormat] = useState("DESKTOP_FEED_STANDARD");


  useEffect(() => {
    //view ad creative
    const getPreview = async () => {
      try {
        const data = await getAdCreativesPreview(adcreativeId, adFormat);
        console.log("Data of adcreative preview", data);
        setPreview(data);
      } catch (err) {
        toast.error("Failed to load ad preview");
      }
    };

    if (adcreativeId) {
      getPreview();
    }
  }, [adcreativeId, adFormat]);
  
  return (
    <div className="p-6 bg-white rounded-md shadow-md mt-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-800">
          Ad Creative Preview
        </h1>
        <select
          className="border border-gray-300 rounded p-2 text-gray-700 text-sm"
          value={adFormat}
          onChange={(e) => setAdFormat(e.target.value)}
        >
          <option value="DESKTOP_FEED_STANDARD">DESKTOP FEED STANDARD</option>
          <option value="MOBILE_FEED_STANDARD">MOBILE FEED STANDARD</option>
          <option value="INSTAGRAM_STANDARD">INSTAGRAM STANDARD</option>
          <option value="INSTAGRAM_REELS">INSTAGRAM REELS</option>
          <option value="INSTAGRAM_STORY">INSTAGRAM STORY</option>
          <option value="FACEBOOK_STORY_MOBILE">FACEBOOK STORY MOBILE</option>
          <option value="MESSENGER_MOBILE_INBOX_MEDIA">
            MESSENGER MOBILE INBOX MEDIA
          </option>
          <option value="AUDIENCE_NETWORK_OUTSTREAM_VIDEO">
            AUDIENCE NETWORK OUTSTREAM VIDEO
          </option>
          <option value="RIGHT_COLUMN_STANDARD">RIGHT COLUMN STANDARD</option>
        </select>
      </div>

      <div
        className="border border-gray-200 rounded-md overflow-hidden w-full flex items-center justify-center"
        dangerouslySetInnerHTML={{__html: preview }}
      />
    </div>
  );
}
