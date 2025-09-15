import { useEffect, useState } from "react";
import { Api } from "../config";

export function ProfileImage({ userId }) {
  const [image, setImage] = useState("avatar.jpg");
  useEffect(() => {
    if (!userId) {
      return;
    }
    const loadImage = async () => {
      try {
        const img = await Api.get(`/fb/user/${userId}`, {
          responseType: "blob",
        });
        setImage(URL.createObjectURL(img.data));
      } catch (err) {
        console.error("Image failed to load", err);
        setImage("avatar.jpg");
      }
    };
    loadImage();
  }, [userId]);
  return (
    <img
      src={image}
      alt="Profile"
      className="w-10 h-10 rounded-full object-cover"
      onError={() => setImage("avatar.jpg")}
    />
  );
}
