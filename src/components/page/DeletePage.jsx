import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "../modal/Modal";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export function DeletePage({ setOpenDelete, handleDelete,pageId }) {
  return (
    <div>
        <Modal onClose={() => setOpenDelete(false)}>
          <div className="w-full">
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
              Are you sure you want to delete this page?
            </p>
            <div className="flex justify-center gap-2 mt-4 p-2 border-t border-gray-400">
              <button
                className="px-4 py-2 rounded bg-gray-100"
                onClick={() => setOpenDelete(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white"
                onClick={() => handleDelete(pageId)} 
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
    </div>
  );
}
