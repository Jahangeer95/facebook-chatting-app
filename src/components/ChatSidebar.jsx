// import { baseURL } from "../config";
import InfiniteScroll from "react-infinite-scroll-component";
import { pageID } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ProfileImage } from "./ProfileImage";

export function ChatSidebar({users = [],onSelect,selectedId,onLoadMore,hasMore,}) {
  return (
    <div
      className="w-1/5 border-r overflow-auto bg-gray-50 h-screen"
      id="scrollableSidebar"
    >
      <div className="p-2 font-bold text-lg border-b bg-blue-400 text-white">
        Contacts
      </div>
      <InfiniteScroll
        dataLength={users.length}
        next={onLoadMore}
        hasMore={hasMore}
        loader={
          <div className="text-center p-4 text-sm text-gray-600">
            <FontAwesomeIcon icon={faSpinner} spin size='lg' className="text-blue-700"/>
          </div>
        }
        scrollableTarget="scrollableSidebar"
      >
        {users.map((conv) => {
          const user = conv.participants?.find((p) => p.id !== pageID);

          return (
            <div
              key={conv.conversationId}
              onClick={() => onSelect(conv)}
              className={`cursor-pointer px-4 py-3 border-b ${
                conv.conversationId === selectedId
                  ? "bg-blue-100"
                  : "hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* <img
                  crossOrigin="anonymous"
                  src={`${baseURL}/fb/user/${user?.id}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "avatar.jpg";
                  }}
                /> */}
                <ProfileImage userId={user?.id} />
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold">
                    {user?.name || "Unknown"}
                  </span>
                  {conv.unread_count > 0 && (
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full object-cover">
                      {conv.unread_count}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}
