import React, { useRef} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ChatMessage } from "./ChatMessage";
import { groupMessagesByDate } from "../helper/GroupMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
export function ChatList  ({ messages, onLoadMore })  {
  const messageEndRef = useRef();

  //group messages by date
  const groupedMessages = groupMessagesByDate(messages);

  return (
    // scrollable container
    <div
      id="scroll-chat"
      ref={messageEndRef}
      className="h-full overflow-auto flex flex-col-reverse"
    >
      <InfiniteScroll
        dataLength={messages.length}
        next={onLoadMore}
        hasMore={true}
        inverse={true}
        scrollableTarget="scroll-chat"
        loader={
          <div className="text-center text-sm text-gray-400">
            <FontAwesomeIcon icon={faSpinner} spin size='lg' className="text-blue-700"/>
          </div>
        }
        //order message from bottom to top
        className="flex flex-col-reverse"
      >
        {Object.entries(groupedMessages)
          .reverse()
          .map(([date, msgs]) => (
            <div key={date}>
              <div className="text-center text-sm text-gray-500 my-2">
                {date}
              </div>
              {msgs.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
            </div>
          ))}
      </InfiniteScroll>
    </div>
  );
};
