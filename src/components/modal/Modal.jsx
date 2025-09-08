import { useEffect } from "react";
import { createPortal } from "react-dom";

export function Modal({ children, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const posts = document.getElementById("scrollposts");
    if (posts) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
      if (posts) {
        document.body.style.overflow = "auto";
      }
    };
  }, []);
  return createPortal(
    <div
      className="modal-open fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-40"
      onClick={onClose}
    >
      <div
        className="bg-blue-900 rounded-lg p-6 shadow-lg relative "
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
}
