// import { useCallback, useEffect, useState } from "react";
import {
    deleteAd
} from "../../api/CampaignEndpoints";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ViewAdCreative } from "./ViewAdCreative";
import { Delete } from "./Delete";
import { user } from "../../config";

export function AdsList({
  ads,
  hasMoreAds,
  paging,
  adsLoading,
  refreshAds,
}) {
  const [selectedAd, setSelectedAd] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  //to delete ad creative
  const handleDelete = async (id) => {
    try {
      await deleteAd(id);
      setOpenDelete(false);
      setSelectedId("");
      refreshAds();
      toast.success("Ad deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

//   preview of ads
  if (selectedAd) {
    return (
      <div>
        <button
          className="px-2 py-2 bg-gray-700 text-white rounded hover:bg-blue-500 mb-4"
          onClick={() => setSelectedAd("")}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <ViewAdCreative
          adId={selectedAd}
          name={"ad"}
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow-sm border border-gray-200 rounded-lg p-5 mt-10">
      <div className="w-full mt-3 overflow-auto h-[150px]" id="scrollCampaign">
        <InfiniteScroll
          dataLength={ads.length}
          next={hasMoreAds}
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
          {adsLoading ? (
            <p className="text-center m-4">Loading Ads...</p>
          ) : ads?.length ? (
            <div className="overflow-x-auto space-y-2 mt-3 rounded-md w-full md:pl-5 ">
              <table className="min-w-full border-collapse rounded-md">
                <thead className="bg-blue-100 text-blue-600 text-sm">
                  <tr>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Name
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Adset
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Adcreative
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Status
                    </th>
                     {(user?.role === "ADMIN" ||user?.role === "MANAGER"|| user?.role === "OWNER")  && (<th className="border px-2 py-2 font-semibold text-left">
                      Delete
                    </th>)}
                    <th className="border px-2 py-2 font-semibold text-left">
                      View Ad
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ads.map((item) => (
                    <tr
                      key={item.id}
                      className="border rounded hover:bg-gray-50 text-xs"
                    >
                        {/* name */}
                      <td className="px-2 py-1 font-medium text-gray-800">
                        {item.name}
                      </td>
                        {/* adset id */}
                      <td className="px-2 py-1 font-medium text-gray-800 max-w-fit">
                        {item.adset_id}
                      </td>
                        {/* adscreative id */}
                      <td className="px-2 py-1 text-gray-700">
                        {item.adcreative_id}
                      </td>
                         {/* status */}
                      <td
                        className={`px-2 py-1 ${
                          item.status === "ACTIVE"
                            ? "text-green-700 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {item.status}
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
                            setSelectedAd(item.id);
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
            <p className="text-gray-500 text-center mt-10 ">No Ads</p>
          )}
        </InfiniteScroll>
      </div>
      {openDelete &&selectedId &&(
          <Delete setOpenDelete={setOpenDelete} id={selectedId} handleDelete={handleDelete}/>
      )}
    </div>
  );
}
