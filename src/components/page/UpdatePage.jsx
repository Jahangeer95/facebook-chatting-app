import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Modal } from "../modal/Modal";
import { updatePage } from "../../api/Login";
import { toast } from "react-toastify";

export function UpdatePage({ setOpenUpdate, page,refreshPages }) {
  console.log("Page details", page);
  const [adId, setadId] = useState(page.ad_token_id || "");
  const [pageId, setPageId] = useState(page.page_id || "");
  const [accessToken, setAccessToken] = useState(page.access_token || "");
  const handleUpdate = async () => {
    try {
      await updatePage(adId, pageId, accessToken, page._id);
      toast.success("Page details updated successfully");
      await refreshPages();
      setOpenUpdate(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Modal onClose={() => setOpenUpdate(false)}>
      <div className="w-[300px] mx-auto sm:w-[400px] md:w-[400px] lg:w-[400px]">
        <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Update Page Detail
          </h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer text-white"
            onClick={() => setOpenUpdate("")}
          />
        </div>
        {/* ad account id */}
        <label
          htmlFor="name"
          className="font-bold mb-1 text-white text-sm sm:text-base"
          placeholder="act_1234567890"
        >
          Ad ID :
        </label>
        <input
          id="name"
          type="text"
          value={adId}
          placeholder="Ad Account ID (e.g., act_1234567890123456)"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded text-sm sm:text-base"
          onChange={(e) => setadId(e.target.value)}
        />

        {/* page id */}
        <label htmlFor="id" className="font-bold mb-1 text-white">
          Page Id :
        </label>
        <input
          id="id"
          type="text"
          value={pageId}
          placeholder="Page ID"
          className="px-2 py-1 mb-3 border block w-full mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded text-sm sm:text-base bg-white cursor-not-allowed disabled:bg-white disabled:text-gray-700 disabled:border-gray-300"
          onChange={(e) => setPageId(e.target.value)}
          required
          disabled
        />

        {/* access token */}
        <label
          htmlFor="token"
          className="font-bold mb-1 text-white text-sm sm:text-base"
        >
          Access Token :
        </label>
        <input
          id="token"
          type="text"
          value={accessToken}
          placeholder="Access Token"
          className="px-2 py-1 mb-3 border block w-full mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded text-sm sm:text-base bg-white cursor-not-allowed disabled:bg-white disabled:text-gray-700 disabled:border-gray-300"
          onChange={(e) => setAccessToken(e.target.value)}
          required
        />
        <div className="flex flex-col sm:flex-row justify-center gap-2 border-t border-gray-400 p-2 text-sm sm:text-base">
          <button
            className="px-7 py-2 rounded bg-gray-300"
            onClick={() => setOpenUpdate(false)}
          >
            Cancel
          </button>
          <button
            className="px-7 py-2 rounded bg-blue-600 text-white text-sm sm:text-base"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
}
