import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { loginUser } from "../api/Login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    try {
      const res = await loginUser(email, password);
      if (res.data) {
        navigate("/pages");
      }
    } catch (error) {
      toast.error("Failed to login.");
    }
  };
  return (
    <div className="flex justify-center items-center border h-screen bg-gray-100">
      <div className="w-96 shadow-lg bg-white rounded-md p-8">
        <h1 className="text-center text-3xl block font-semibold mb-2">Login</h1>
        <div>
          <label htmlFor="email" className="font-bold mb-1">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Username :
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded "
            onChange={(e) => setEmail(e.target.value)}
            inputMode="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="font-bold mb-1">
            <FontAwesomeIcon icon={faLock} className="mr-2" />
            Password :
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-center">
            <button
              className="px-4 py-2 bg-blue-400 rounded text-white mt-2 hover:bg-blue-800 transition"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
