import { useEffect, useState } from "react";
import { getUserProfilePic } from "../api/MessengerApi";
export function Sidebar({ users = [], onSelect, selectedId, pageID }) {
  const [profilePics, setProfilePic] = useState({});
  useEffect(() => {
    async function getUsersPic() {
      const pics = {};
      for (const conv of users) {
        const user = conv.participants?.find((p) => p.id !== pageID);
        if (user?.id && !profilePics[user.id]) {
          const pic = await getUserProfilePic(user.id);
          pics[user.id] = pic;
        }
      }
      setProfilePic((prev) => ({ ...prev, ...pics }));
    };
    if (users.length > 0) {
      getUsersPic();
    }
  }, [users, pageID]);

  return (
    <div className="w-1/5 border-r overflow-auto bg-gray-50">
      <div className="p-4 font-bold text-lg border-b bg-blue-500 text-white">
        Contacts
      </div>
      {users.map((conv) => {
        const user = conv.participants?.find((p) => p.id !== pageID);
        const profilePic = profilePics[user?.id];

        return (
          <div
            key={conv.id}
            onClick={() => onSelect(conv)}
            className={`cursor-pointer px-4 py-3 border-b ${
              conv.id === selectedId ? "bg-blue-100" : "hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center gap-4">
              <img
                src={profilePic || "avatar.jpg"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="font-semibold">{user?.name || "XYZ"}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
