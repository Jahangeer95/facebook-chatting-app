export function ChatHeader ({ user }) {
  return (
    <div className="bg-blue-400 text-white p-2 text-lg font-semibold">
      {user?.name || 'Select a user'}
    </div>
  );
};
