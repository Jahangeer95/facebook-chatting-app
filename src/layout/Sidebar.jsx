import { faCommentDots, faHome, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
export function Sidebar() {
  return (
    <div className="w-1/5 border-r border-gray-300 shadow-sm overflow-auto bg-blue-900 h-screen">
      <ul className="divide-y divide-gray-300">
      <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 p-3 bg-blue-500 text-white font-bold border-l-4 border-white"
                  : "flex items-center gap-2 p-3 text-white hover:bg-blue-700"
              }
          >
            <FontAwesomeIcon icon={faHome}/>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/messenger"}
            className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 p-3 bg-blue-500 text-white font-bold border-l-4 border-white"
                  : "flex items-center gap-2 p-3 text-white hover:bg-blue-700"
              }
          >
            <FontAwesomeIcon icon={faCommentDots}/>
            Messenger
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/posts"}
            className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 p-3 bg-blue-500 text-white font-bold border-l-4 border-white"
                  : "flex items-center gap-2 p-3 text-white hover:bg-blue-700"
              }
          >
            <FontAwesomeIcon icon={faNewspaper}/>
            Posts
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
