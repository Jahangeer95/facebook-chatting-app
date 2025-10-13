import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export function Header({ onToggleSidebar }) {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-900 text-white p-2 text-2xl font-semibold text-center border-b border-gray-300 shadow-sm">
      <div className="flex items-center">
        <button
          className="hover:scale-105 w-fit text-lg px-2"
          onClick={() => navigate(`/pages`)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="flex-1 items-center">Facebook</h1>
        <button className="md:hidden text-xl mr-3" onClick={onToggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      
    </div>
  );
}
