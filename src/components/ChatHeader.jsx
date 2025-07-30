export const ChatHeader = ({ user }) => {
  return (
    <div className="bg-blue-600 text-white p-4 text-lg font-medium">
      {user?.name || 'Select a user'}
    </div>
  );
};
