import { logoutUser } from "./Logout";

export const LogoutButton = () => {
  return (
    <div className="flex justify-end p-4">
      <button
        onClick={logoutUser}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};
