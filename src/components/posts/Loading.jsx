import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Loading() {
  return (
    <div className="text-center mt-10">
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        size="lg"
        className="text-blue-700"
      />
      <p className="mt-2 text-gray-600">Loading Posts...</p>
    </div>
  );
}
