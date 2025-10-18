import { useState } from "react";

export function CampaignsList({ campaigns }) {
  const [loading] = useState(false);

  return (
    <div className="w-full bg-white shadow-sm border border-gray-200 rounded-lg p-5 mt-10">
      {loading ? (
        <p className="text-center m-4">Loading campaigns...</p>
      ) : campaigns?.length ? (
        <div className="overflow-x-auto space-y-2 mt-3 rounded-md w-full md:pl-5 ">
          <table className="min-w-full border-collapse rounded-md ">
            <thead className="bg-blue-100 text-blue-600">
              <tr>
                <th className="border px-2 py-2 font-semibold text-left">Name</th>
                <th className="border px-2 py-2 font-semibold text-left">Status</th>
                <th className="border px-2 py-2 font-semibold text-left">Objective</th>
                <th className="border px-2 py-2 font-semibold text-left">Created Time</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((item) => (
                <tr
                  key={item.id}
                  className="border p-3 rounded hover:bg-gray-100 text-xs"
                >
                  <td className="px-2 py-1 font-medium text-gray-800">
                    {item.name}
                  </td>
                  <td className="px-2 py-2 text-gray-600">{item.status}</td>
                  <td className="px-2 py-2 text-gray-600">{item.objective}</td>
                  <td className="px-2 py-2 text-gray-500">
                    {new Date(item.created_time).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No Campaign is available</p>
      )}
    </div>
  );
}
