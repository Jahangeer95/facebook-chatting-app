import { baseURL } from "../config";
import InfiniteScroll from "react-infinite-scroll-component";
import { pageID } from "../config";

export function Sidebar({users = [],onSelect,selectedId,onLoadMore,hasMore,}) {
  return (
    <div
      className="w-1/5 border-r overflow-auto bg-gray-50 h-[100px]"
      id="scrollableSidebar"
    >
      <div className="p-4 font-bold text-lg border-b bg-blue-500 text-white">
        Contacts
      </div>
      <InfiniteScroll
        dataLength={users.length}
        next={onLoadMore}
        hasMore={hasMore}
        loader={
          <div className="text-center py-2 text-sm text-gray-600">
            Loading...
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
                <img
                  crossOrigin="anonymous"
                  src={`${baseURL}/fb/user/${user?.id}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "avatar.jpg";
                  }}
                />
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
