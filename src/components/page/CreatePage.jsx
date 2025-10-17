import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Modal } from "../modal/Modal";
import { createPage } from "../../api/Login";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

export function CreatePage({ setSelected,refreshPages,refreshUsers }) {
  const [adId, setadId] = useState("");
  const [pageId, setPageId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  // const navigate = useNavigate();
  const handleCreate = async () => {
    try {
      await createPage(adId, pageId, accessToken);
      toast.success("Page created successfully");
      //refresh pages list after page creation
      await refreshPages();
      await refreshUsers();
      setSelected(false);
      setAccessToken("");
      setPageId("");
      setadId("");
      // navigate("/pages");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Modal onClose={() => setSelected(false)}>
      <div className="w-[300px] mx-auto sm:w-[400px] md:w-[400px] lg:w-[400px]">
        <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
          <h2 className="text-lg font-semibold text-white sm:text-xl">Link Page</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer text-white"
            onClick={() => setSelected("")}
          />
        </div>
        <label htmlFor="name" className="font-bold mb-1 text-white text-sm sm:text-base">
           Ad ID :
        </label>
        <input
          id="name"
          type="text"
          placeholder="Page Name"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded text-sm sm:text-base"
          onChange={(e) => setadId(e.target.value)}
          // required
        />
        <label htmlFor="id" className="font-bold mb-1 text-white">
          Page Id :
        </label>
        <input
          id="id"
          type="text"
          placeholder="Page ID"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded text-sm sm:text-base "
          onChange={(e) => setPageId(e.target.value)}
          required
        />
        <label htmlFor="token" className="font-bold mb-1 text-white text-sm sm:text-base">
          Access Token :
        </label>
        <input
          id="token"
          type="text"
          placeholder="Access Token"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded text-sm sm:text-base"
          onChange={(e) => setAccessToken(e.target.value)}
          required
        />
        <div className="flex flex-col sm:flex-row justify-center gap-2 border-t border-gray-400 p-2 text-sm sm:text-base">
          <button
            className="px-7 py-2 rounded bg-gray-300"
            onClick={() => setSelected(false)}
          >
            Cancel
          </button>
          <button
            className="px-7 py-2 rounded bg-blue-600 text-white text-sm sm:text-base"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
}
