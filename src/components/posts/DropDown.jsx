import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../modal/Modal";

export function DropDown({ postId, message, onUpdate, onDelete }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [newMessage, setNewMessage] = useState(message || " ");

  const handleUpdate = () => {
    if (onUpdate && newMessage.trim()) {
      onUpdate(postId, newMessage);
    }
    setOpenUpdate(false);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(postId);
    setOpenDelete(false);
  };

  return (
    <div className="flex flex-col p-2">
      <ul className="divide-y divide-gray-300">
        <li
          className="cursor-pointer hover:text-blue-600 mb-2"
          onClick={() => setOpenUpdate(true)}
        >
          Update
        </li>
        <li
          className="cursor-pointer hover:text-blue-600 mb-2"
          onClick={() => setOpenDelete(true)}
        >
          Delete
        </li>
      </ul>

      {/* update */}
      {openUpdate && (
        <Modal onClose={() => setOpenUpdate(false)}>
          <div className="w-96">
            <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
              <h2 className="text-lg font-semibold text-white">Update Post</h2>
              <FontAwesomeIcon
                icon={faTimes}
                className="cursor-pointer text-white"
                onClick={() => setOpenUpdate(false)}
              />
            </div>
            <h3 className="text-white mb-2"> Type Update Message : </h3>
            <textarea
              className="w-full border rounded p-2 mb-4"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here"
            />
            <div className="flex justify-center gap-2 border-t border-gray-400 p-2">
              <button
                className="px-4 py-2 rounded bg-gray-300"
                onClick={() => setOpenUpdate(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* delete */}
      {openDelete && (
        <Modal onClose={() => setOpenDelete(false)}>
          <div className="w-96">
            <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
              <h2 className="text-lg font-semibold text-white">
                Delete Confirmation
              </h2>
              <FontAwesomeIcon
                icon={faTimes}
                className="cursor-pointer text-white"
                onClick={() => setOpenDelete(false)}
              />
            </div>
            <div className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={faTimes}
                size="2x"
                className="w-12 h-12 flex items-center justify-center border rounded-full border-white p-2 text-red-600"
              />
            </div>

            <p className="text-center text-white p-2">
              Are you sure you want to delete this post?
            </p>
            <div className="flex justify-center gap-2 mt-4 p-2 border-t border-gray-400">
              <button
                className="px-4 py-2 rounded bg-gray-300"
                onClick={() => setOpenDelete(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
