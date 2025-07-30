export const Sidebar = ({ users = [], onSelect, selectedId, pageID }) => {
  return (
    <div className="w-1/5 border-r overflow-auto bg-gray-50">
      <div className="p-4 font-bold text-lg border-b bg-blue-500 text-white">
        Contacts
      </div>
      {users.map((conv) => {
        const user = conv.participants?.find((p) => p.id !== pageID);
        return (
          <div
            key={conv.id}
            onClick={() => onSelect(conv)}
            className={`cursor-pointer px-4 py-3 border-b ${
              conv.id === selectedId ? "bg-blue-100" : "hover:bg-gray-200"
            }`}
          >
            <div className="font-semibold">{user?.name || "XYZ"}</div>
          </div>
        );
      })}
    </div>
  );
};
