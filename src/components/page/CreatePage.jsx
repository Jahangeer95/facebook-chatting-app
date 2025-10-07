import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Modal } from "../modal/Modal";
import { createPage } from "../../api/Login";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

export function CreatePage({ setSelected,refreshPages }) {
  const [pageName, setPageName] = useState("");
  const [pageId, setPageId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  // const navigate = useNavigate();
  const handleCreate = async () => {
    try {
      await createPage(pageName, pageId, accessToken);
      toast.success("Page created successfully");
      //refresh pages list after page creation
      await refreshPages();
      setSelected(false);
      setAccessToken("");
      setPageId("");
      setPageName("");
      // navigate("/pages");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Modal onClose={() => setSelected(false)}>
      <div className="w-96">
        <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
          <h2 className="text-lg font-semibold text-white">Create Page</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer text-white"
            onClick={() => setSelected("")}
          />
        </div>
        <label htmlFor="name" className="font-bold mb-1 text-white">
          Page Name :
        </label>
        <input
          id="name"
          type="text"
          placeholder="Page Name"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded "
          onChange={(e) => setPageName(e.target.value)}
          required
        />
        <label htmlFor="id" className="font-bold mb-1 text-white">
          Page Id :
        </label>
        <input
          id="id"
          type="text"
          placeholder="Page ID"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded "
          onChange={(e) => setPageId(e.target.value)}
          required
        />
        <label htmlFor="token" className="font-bold mb-1 text-white">
          Access Token :
        </label>
        <input
          id="token"
          type="text"
          placeholder="Access Token"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded "
          onChange={(e) => setAccessToken(e.target.value)}
          required
        />
        <div className="flex justify-center gap-2 border-t border-gray-400 p-2">
          <button
            className="px-4 py-2 rounded bg-gray-300"
            onClick={() => setSelected(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
}
