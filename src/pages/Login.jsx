import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { loginUser } from "../api/Login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    try {
      if (!username.trim() || !password.trim()) {
        if (!username.trim()) {
          toast.error("Username is empty.");
        }
        if (!password.trim()) {
          toast.error("Password is empty.");
        }
      } else {
        const res = await loginUser(username, password);
        if (res.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
          const token = localStorage.getItem("user_auth_token");
          //save user id
          localStorage.setItem("user_id", res.data._id);
          console.log("userId", res.data._id);

          //check if auth is present only then navigate to pages
          if (token) {
            navigate("/pages");
          }
          else{
            toast.error("Login failed auth token is missing")
          }
        }
      }
    } catch (error) {
      toast.error(error.message || "Failed to login.");
    }
  };

  //redirect user to /pages if auth token is in localStorage
  useEffect(()=>{
    const token = localStorage.getItem("user_auth_token");
    if (token) {
      navigate("/pages");
    }
  },[navigate])
  return (
    <div className="flex justify-center items-center border min-h-screen bg-gray-100">
      <div className="w-96 shadow-lg bg-white rounded-md p-8">
        <h1 className="text-center text-3xl block font-semibold mb-2">Login</h1>
        <div>
          <label htmlFor="username" className="font-bold mb-1">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Username :
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded "
            onChange={(e) => setUsername(e.target.value)}
            inputMode="text"
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
              className="px-4 py-2 bg-blue-400 rounded text-white mt-2 hover:bg-blue-800 transition w-full sm:w-auto"
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
