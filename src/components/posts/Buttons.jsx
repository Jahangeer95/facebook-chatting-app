import { useState } from "react";
import { PagePosts } from "./PagePosts";
import { SchedulePosts } from "./SchedulePosts";

export function Buttons() {
  const [selectedType, setSelectedType] = useState("publish");
  return (
    <div className="flex flex-col items-center mb-10 h-screen">
      <div className="flex justify-center">
        <button
          className={`p-3  mb-3 mr-4 rounded text-white ${
            selectedType === "publish" ? "bg-blue-700 font-bold" : "bg-blue-500"
          }`}
          onClick={() => setSelectedType("publish")}
        >
          Published Posts 
        </button>
        <button
          className={`p-3  mb-3 mr-4 rounded text-white ${
            selectedType === "schedule" ? "bg-blue-700 font-bold" : "bg-blue-500"
          }`}
          onClick={() => setSelectedType("schedule")}
        >
          Scheduled Posts
        </button>
      </div>

      <div 
      className="md:w-[700px] mx-auto p-4 border overflow-auto w-full"
      id="scrollposts">
        {/* <div className="w-full max-w-2xl"> */}
          {selectedType === "publish" && <PagePosts />}
          {selectedType === "schedule" && <SchedulePosts />}
        {/* </div> */}
      </div>
    </div>
  );
}
