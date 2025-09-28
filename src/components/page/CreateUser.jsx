import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Modal } from "../modal/Modal";
import { createUser } from "../../api/Login";
import { toast } from "react-toastify";

export function CreateUser({ setSelected }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleCreate = async () => {
    try {
      await createUser(username, email, password, role);
      setSelected(false);
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      toast.error("Failed to create a page");
    }
  };
  return (
    <Modal onClose={() => setSelected(false)}>
      <div className="w-96">
        <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
          <h2 className="text-lg font-semibold text-white">Create User</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer text-white"
            onClick={() => setSelected("")}
          />
        </div>
        <label className="font-bold mb-1 text-white">Username :</label>
        <input
          type="text"
          placeholder="Enter username"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="font-bold mb-1 text-white">Email :</label>
        <input
          type="email"
          placeholder="Enter email"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="font-bold mb-1 text-white">Password :</label>
        <input
          type="password"
          placeholder="Enter password"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="font-bold mb-1 text-white">Role :</label>
        <input
          type="text"
          placeholder="Enter role"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
