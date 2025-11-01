import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfiniteScroll from "react-infinite-scroll-component";
import { deleteAdset } from "../../api/CampaignEndpoints";
import { toast } from "react-toastify";
import { useState } from "react";
import { Delete } from "./Delete";

export function ViewAdsets({
  adsets,
  hasMoreAdsets,
  paging,
  adsetsLoading,
  refreshAdsets,
}) {
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  //delete adset
  const handleDelete = async (id) => {
    try {
      await deleteAdset(id);
      setOpenDelete(false);
      setSelectedId(" ");
      refreshAdsets();
      toast.success("Adset deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full bg-white shadow-sm border border-gray-200 rounded-lg p-5 mt-10">
      <div className="w-full mt-3 overflow-auto h-[150px]" id="scrollCampaign">
        <InfiniteScroll
          dataLength={adsets.length}
          next={hasMoreAdsets}
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
          {adsetsLoading ? (
            <p className="text-center m-4">Loading Adsets...</p>
          ) : adsets?.length ? (
            <div className="overflow-x-auto space-y-2 mt-3 rounded-md w-full md:pl-5 ">
              <table className="min-w-full border-collapse rounded-md ">
                <thead className="bg-blue-100 text-blue-600 text-sm">
                  <tr>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Name
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Status
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Daily Budget
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Start Time
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      End Time
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Campaign Id
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Targeting
                    </th>
                    <th className="border px-2 py-2 font-semibold text-left">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {adsets.map((item) => (
                    <tr
                      key={item.id}
                      className="border p-3 rounded hover:bg-gray-100 text-xs"
                    >
                      {/* Name */}
                      <td className="px-2 py-1 font-medium text-gray-800">
                        {item.name}
                      </td>
                      {/* status */}
                      <td className="px-2 py-2 text-gray-600">{item.status}</td>

                      {/* budget */}
                      <td className="px-2 py-2 text-gray-600">
                        {item.daily_budget}
                      </td>
                      {/* start date */}
                      <td className="px-2 py-2 text-gray-600">
                        {new Date(item.start_time).toLocaleString()}
                      </td>

                      {/* end date */}
                      <td className="px-2 py-2 text-gray-600">
                        {new Date(item.end_time).toLocaleString()}
                      </td>

                      {/* campaign id */}
                      <td className="px-2 py-2 text-gray-500">
                        {item.campaign_id}
                      </td>

                      {/* targeting countries */}
                      <td className="px-2 py-2 text-gray-600">
                        {item.targeting?.geo_locations?.countries?.join(", ")}
                      </td>

                      {/* button to delete campaign adset*/}
                      <td className="px-2 py-2 text-gray-500">
                        <button
                          className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                          onClick={() => {setSelectedId(item.id); setOpenDelete(true)}}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10">No Adset is available</p>
          )}
        </InfiniteScroll>
      </div>

      {/* delete adset */}
      {openDelete &&selectedId &&(
        <Delete setOpenDelete={setOpenDelete} id={selectedId} handleDelete={handleDelete}/>
      )}
    </div>
  );
}
