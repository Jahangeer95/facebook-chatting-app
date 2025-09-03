import { useEffect, useState } from "react";
import { accessToken, baseURL, pageID } from "../config";

export function ProfileImage({ userId }) {
  const [image, setImage] = useState("avatar.jpg");
  useEffect(() => {
    if (!userId) {
      return;
    }
    const loadImage = async () => {
      try {
        const img = await fetch(`${baseURL}/fb/user/${userId}`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            FB_PAGE_ID: pageID,
            FB_ACCESS_TOKEN: accessToken,
          },
        });
        const blob = await img.blob();
        setImage(URL.createObjectURL(blob));
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
