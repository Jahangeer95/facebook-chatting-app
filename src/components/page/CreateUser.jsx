import { faEye, faEyeSlash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Modal } from "../modal/Modal";
import { createUser } from "../../api/Login";
import { toast } from "react-toastify";

export function CreateUser({ setSelected, refreshUsers }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const handleCreate = async () => {
    // //check username length
    // if (username.length < 5) {
    //   toast.error("Username must be atleast 5 characters long");
    //   return;
    // }
    // //check email format
    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   toast.error("Please enter a valid email address");
    //   return;
    // }
    // // check password length
    // if (password.length < 7) {
    //   toast.error("Password must be atleast 7 characters long");
    //   return;
    // }
    try {
      await createUser(username, email, password, role);
      toast.success("User created successfully");
      refreshUsers();
      setSelected(false);
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Modal onClose={() => setSelected(false)}>
      <div className="w-[300px] mx-auto sm:w-[400px] md:w-[400px] lg:w-[400px]">
        <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Create User
          </h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer text-white text-sm sm:text-base"
            onClick={() => setSelected("")}
          />
        </div>
        <label className="font-bold mb-1 text-white text-sm sm:text-base">
          Username :
        </label>
        <input
          type="text"
          placeholder="Enter username"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label className="font-bold mb-1 text-white text-sm sm:text-base">
          Email :
        </label>
        <input
          type="email"
          placeholder="Enter email"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded text-sm sm:text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative mb-4">
          <label className="font-bold mb-1 text-white text-sm sm:text-base">
            Password :
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded text-sm sm:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/*show/hide password icon */}
          {
            <span
              className="absolute right-2 top-[38px] cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="text-gray-500 hover:text-blue-500 cursor-pointer"
              />
            </span>
          }
        </div>

        <label className="font-bold mb-1 text-white text-sm sm:text-base">
          Role :
        </label>
        <select
          // type="text"
          // placeholder="Enter role"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded text-sm sm:text-base"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="ADMIN">ADMIN</option>
          <option value="MANAGER">MANAGER</option>
          <option value="MODERATOR">MODERATOR</option>
          <option value="EDITOR">EDITOR</option>
        </select>

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
