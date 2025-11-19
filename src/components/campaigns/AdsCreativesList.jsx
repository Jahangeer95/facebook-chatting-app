// import { useCallback, useEffect, useState } from "react";
import {
  deleteAdcreative,
} from "../../api/CampaignEndpoints";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ViewAdCreative } from "./ViewAdCreative";
import { Delete } from "./Delete";
import { user } from "../../config";

export function AdCreativesList({
  creatives,
  hasMoreCreatives,
  paging,
  creativesLoading,
  refreshCreatives,
}) {
  const [selectedAdCreative, setSelectedAdCreative] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  //to delete ad creative
  const handleDelete = async (id) => {
    try {
      await deleteAdcreative(id);
      refreshCreatives();
      setOpenDelete(false);
      setSelectedId("")
      toast.success("Creatives deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (selectedAdCreative) {
    return (
      <div>
        <button
          className="px-2 py-2 bg-gray-700 text-white rounded hover:bg-blue-500 mb-4"
          onClick={() => setSelectedAdCreative("")}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <ViewAdCreative
          adId={selectedAdCreative}
          // setSelectedAdCreative={setSelectedAdCreative}
          name={"adcreatives"}
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow-sm border border-gray-200 rounded-lg p-5 mt-10">
      <div className="w-full mt-3 overflow-auto h-[150px]" id="scrollCampaign">
        <InfiniteScroll
          dataLength={creatives.length}
          next={hasMoreCreatives}
          hasMore={!!paging?.next}
          loader={
            <div className="text-center p-4 text-sm text-gray-600">
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                size="lg"
                className="text-blue-700"
              />
            </div>
          }
          scrollableTarget="scrollCampaign"
        >
          {creativesLoading ? (
            <p className="text-center m-4">Loading Creatives...</p>
          ) : creatives?.length ? (
            <div className="overflow-x-auto space-y-2 mt-3 rounded-md w-full md:pl-5 ">
              <table className="min-w-full border-collapse rounded-md">
                <thead className="bg-blue-100 text-blue-600 text-sm">
                  <tr>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Name
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Title
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Message
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Link
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Call To Action
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Status
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Image
                    </th>
                    {(user?.role === "ADMIN" ||user?.role === "MANAGER"|| user?.role === "OWNER")  && (<th className="border px-2 py-2 font-semibold text-left">
                      Delete
                    </th>)}
                    <th className="border px-2 py-2 font-semibold text-left">
                      View Ad Creative
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {creatives.map((item) => (
                    <tr
                      key={item.id}
                      className="border rounded hover:bg-gray-50 text-xs"
                    >
                      <td className="px-2 py-1 font-medium text-gray-800">
                        {item.name}
                      </td>

                      <td className="px-2 py-1 font-medium text-gray-800 max-w-fit">
                        {item.title}
                      </td>

                      <td className="px-2 py-1 text-gray-700">
                        {item.object_story_spec?.link_data?.message ||
                          item.body}
                      </td>

                      <td className="px-2 py-1 text-blue-600 underline">
                        <a
                          href={item.object_story_spec?.link_data?.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.object_story_spec?.link_data?.link}
                        </a>
                      </td>

                      <td className="px-2 py-1 text-gray-700">
                        {item.object_story_spec?.link_data?.call_to_action
                          ?.type || item.call_to_action_type}
                      </td>

                      <td
                        className={`px-2 py-1 ${
                          item.status === "ACTIVE"
                            ? "text-green-700 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {item.status}
                      </td>

                      <td className="px-2 py-1 text-gray-700">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt="Creative"
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          " "
                        )}
                      </td>

                      {(user?.role === "ADMIN" ||user?.role === "MANAGER"|| user?.role === "OWNER")  && (<td className="px-2 py-2 text-gray-500">
                        <button
                          className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                          onClick={() => {setSelectedId(item.id); setOpenDelete(true)}}
                        >
                          Delete
                        </button>
                      </td>)}

                      <td className="px-2 py-2 text-gray-500">
                        <button
                          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                          onClick={() => {
                            setSelectedAdCreative(item.id);
                            // getpreview(item.id);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No Ad Creative is available</p>
          )}
        </InfiniteScroll>
      </div>
      {/* delete campaign */}
      {openDelete &&selectedId &&(
        <Delete setOpenDelete={setOpenDelete} id={selectedId} handleDelete={handleDelete}/>
      )}
    </div>
  );
}
