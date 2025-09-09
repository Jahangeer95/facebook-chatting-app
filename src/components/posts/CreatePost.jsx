import { useEffect, useRef, useState } from "react";
import { PostDropDown } from "./PostDropDown";
import { TextPost } from "./TextPost";
import { MediaPost } from "./MediaPost";
import { Modal } from "../modal/Modal";
import { Buttons } from "./Buttons";

export function CreatePost() {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const handleSelect = (type) => {
    setSelectedType(type);
    setOpen(false);
  };
  const closeForm = () => setSelectedType("");
  return (
    <div className="relative w-full mt-3">
      <div className="absolute top-0 right-0">
        <div className="text-end relative" ref={menuRef}>
          <button
            className="p-3 bg-blue-700 rounded  mr-4 text-white"
            onClick={() => setOpen(!open)}
          >
            Create Post
          </button>
          {open && (
            <div className="absolute right-10 mt-1 w-44 bg-white border rounded shadow-lg z-50">
              <PostDropDown onSelect={handleSelect} />
            </div>
          )}
        </div>
      </div>
      <Buttons />
      {selectedType && (
        <Modal onClose={closeForm}>
          {selectedType === "text" ? (
            <TextPost onClose={closeForm} />
          ) : (
            <MediaPost onClose={closeForm} />
          )}
        </Modal>
      )}
    </div>
  );
}
