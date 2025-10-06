import {
  faCommentDots,
  faHome,
  faNewspaper,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useParams } from "react-router-dom";
import { logoutUser } from "../helper/Logout";
export function Sidebar() {
  const { pageID } = useParams();
  //current user
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log("Logged In User:", user);
  return (
    <div className="w-1/5 border-r border-gray-300 shadow-sm overflow-auto bg-blue-900 h-screen flex flex-col">
      <ul className="divide-y divide-gray-300">
        {(user?.role === "ADMIN" || user?.role === "MANAGER" )  && (
          <li>
            <NavLink
              to={`/${pageID}/home`}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 p-3 bg-blue-500 text-white font-bold border-l-4 border-white"
                  : "flex items-center gap-2 p-3 text-white hover:bg-blue-700"
              }
            >
              <FontAwesomeIcon icon={faHome} />
              Home
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to={`/${pageID}/messenger`}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 p-3 bg-blue-500 text-white font-bold border-l-4 border-white"
                : "flex items-center gap-2 p-3 text-white hover:bg-blue-700"
            }
          >
            <FontAwesomeIcon icon={faCommentDots} />
            Messenger
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${pageID}/posts`}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 p-3 bg-blue-500 text-white font-bold border-l-4 border-white"
                : "flex items-center gap-2 p-3 text-white hover:bg-blue-700"
            }
          >
            <FontAwesomeIcon icon={faNewspaper} />
            Posts
          </NavLink>
        </li>
      </ul>
      <ul className="mt-auto divide-y divide-gray-300">
        <li className="border-t">
          <button
            onClick={logoutUser}
            className={"flex items-center gap-2 p-3 text-white font-bold hover:bg-blue-700 w-full"
            }
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}