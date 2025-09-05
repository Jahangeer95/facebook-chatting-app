export function Modal({ children, onClose }) {
  return(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-40"
      onClick={onClose}
    >
      <div
        className="bg-blue-900 rounded-lg p-6 shadow-lg relative "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}