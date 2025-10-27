import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Modal } from "../modal/Modal";
import { toast } from "react-toastify";
import { createAdCreatives, uploadAdImage } from "../../api/CampaignEndpoints";
import { useParams } from "react-router-dom";

export function CreateAdsCreatives({ setSelected,refreshCreatives }) {
  const { pageID } = useParams();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [headline, setHeadline] = useState("");
  const [callToAction, setCallToAction] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const callToActionOptions = [
    "BOOK_TRAVEL",
    "CONTACT_US",
    "DONATE",
    "DONATE_NOW",
    "DOWNLOAD",
    "GET_DIRECTIONS",
    "GO_LIVE",
    "INTERESTED",
    "LEARN_MORE",
    "SEE_DETAILS",
    "LIKE_PAGE",
    "MESSAGE_PAGE",
    "RAISE_MONEY",
    "SAVE",
    "SEND_TIP",
    "SHOP_NOW",
    "SIGN_UP",
    "VIEW_INSTAGRAM_PROFILE",
    "INSTAGRAM_MESSAGE",
    "LOYALTY_LEARN_MORE",
    "PURCHASE_GIFT_CARDS",
    "PAY_TO_ACCESS",
    "SEE_MORE",
    "TRY_IN_CAMERA",
    "WHATSAPP_LINK",
    "GET_IN_TOUCH",
    "TRY_NOW",
    "BOOK_NOW",
    "CHECK_AVAILABILITY",
    "ORDER_NOW",
    "WHATSAPP_MESSAGE",
    "GET_MOBILE_APP",
    "INSTALL_MOBILE_APP",
    "USE_MOBILE_APP",
    "INSTALL_APP",
    "USE_APP",
    "PLAY_GAME",
    "TRY_DEMO",
    "WATCH_VIDEO",
    "WATCH_MORE",
    "OPEN_LINK",
    "NO_BUTTON",
    "LISTEN_MUSIC",
    "MOBILE_DOWNLOAD",
    "GET_OFFER",
    "GET_OFFER_VIEW",
    "BUY_NOW",
    "BUY_TICKETS",
    "UPDATE_APP",
    "BET_NOW",
    "ADD_TO_CART",
    "SELL_NOW",
    "GET_SHOWTIMES",
    "LISTEN_NOW",
    "GET_EVENT_TICKETS",
    "REMIND_ME",
    "SEARCH_MORE",
    "PRE_REGISTER",
    "SWIPE_UP_PRODUCT",
    "SWIPE_UP_SHOP",
    "PLAY_GAME_ON_FACEBOOK",
    "VISIT_WORLD",
    "OPEN_INSTANT_APP",
    "JOIN_GROUP",
    "GET_PROMOTIONS",
    "SEND_UPDATES",
    "INQUIRE_NOW",
    "VISIT_PROFILE",
    "CHAT_ON_WHATSAPP",
    "EXPLORE_MORE",
    "CONFIRM",
    "JOIN_CHANNEL",
    "MAKE_AN_APPOINTMENT",
    "ASK_ABOUT_SERVICES",
    "BOOK_A_CONSULTATION",
    "GET_A_QUOTE",
    "BUY_VIA_MESSAGE",
    "ASK_FOR_MORE_INFO",
    "CHAT_WITH_US",
    "VIEW_PRODUCT",
    "VIEW_CHANNEL",
    "WATCH_LIVE_VIDEO",
    "IMAGINE",
    "CALL",
    "MISSED_CALL",
    "CALL_NOW",
    "CALL_ME",
    "APPLY_NOW",
    "BUY",
    "GET_QUOTE",
    "SUBSCRIBE",
    "RECORD_NOW",
    "VOTE_NOW",
    "GIVE_FREE_RIDES",
    "REGISTER_NOW",
    "OPEN_MESSENGER_EXT",
    "EVENT_RSVP",
    "CIVIC_ACTION",
    "SEND_INVITES",
    "REFER_FRIENDS",
    "REQUEST_TIME",
    "SEE_MENU",
    "SEARCH",
    "TRY_IT",
    "TRY_ON",
    "LINK_CARD",
    "DIAL_CODE",
    "FIND_YOUR_GROUPS",
    "START_ORDER",
  ];
  const handleCreate = async () => {
    try {

      //upload image
      const imgResult = await uploadAdImage(imageFile);
      const image = imgResult.image_hash;
      console.log("Image hash",image)

      //create ad creative
      await createAdCreatives(
        name,
        pageID,
        message,
        link,
        headline,
        callToAction,
        image
      );
      toast.success("AdCreative created successfully");
      refreshCreatives();
      setName("");
      setMessage("");
      setLink("");
      setHeadline("");
      setCallToAction("");
      setImageFile(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal onClose={() => setSelected(false)}>
      <div className="w-[300px] mx-auto sm:w-[400px] md:w-[400px] lg:w-[400px]">
        <div className="flex justify-between items-center mb-4 border-b border-gray-400 p-2">
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Create AdCreatives
          </h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer text-white text-sm sm:text-base"
            onClick={() => setSelected("")}
          />
        </div>


        <label className="font-bold mb-1 text-white text-sm sm:text-base">
          Name :
        </label>
        <input
          type="text"
          placeholder="Ad Creative Name"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />


        <label className="font-bold mb-1 text-white text-sm sm:text-base">
          Message:
        </label>
        <input
          type="text"
          placeholder="Ad Message"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />


        <label className="font-bold mb-1 text-white text-sm sm:text-base">
          Link:
        </label>
        <input
          type="text"
          placeholder="Ad Link"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />


        <label className="font-bold mb-1 text-white text-sm sm:text-base">
          Headline:
        </label>
        <input
          type="text"
          placeholder="Ad Headline"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          required
        />


        <label className="font-bold mb-1 text-white text-sm sm:text-base">
          Call To Action :
        </label>
        <select
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded text-sm sm:text-base"
          value={callToAction}
          onChange={(e) => setCallToAction(e.target.value)}
          required
        >
          <option value="">Select Call To Action</option>
          {callToActionOptions.map((actions) => (
            <option key={actions} value={actions}>
              {actions.replace("_", " ")}
            </option>
          ))}
        </select>


        <label
          htmlFor="fileInput"
          className="font-bold mb-1 text-white text-sm sm:text-base"
        >
          Image:
        </label>
        <input
          type="file"
          className="px-2 py-1 mb-3 border  block w-full  mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400  rounded text-sm sm:text-base"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />


        <div className="flex flex-col sm:flex-row justify-center gap-2 border-t border-gray-400 p-2">
          <button
            className="px-7 py-2 rounded bg-gray-300 w-full sm:w-auto hover:bg-gray-400 transition"
            onClick={() => setSelected(false)}
          >
            Cancel
          </button>
          <button
            className="px-7 py-2 rounded bg-blue-600 text-white w-full sm:w-auto hover:bg-blue-700 transition"
            onClick={handleCreate}
            disabled={!imageFile}
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
}
