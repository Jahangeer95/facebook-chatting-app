import { PageUsers } from "./PageUsers";
import { Settings } from "./Settings";
import { Insights } from "./Insights";
import { PageDetails } from "./PageDetails";

export function Home() {
  function formatName(name) {
    const names={
      fan_count:"Fans",
      followers_count:"Followers",
      rating_count:"Ratings"
    }
    if (names[name]){
      return names[name];
    }
    // const title = name.split("_").join("");
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return (
    <div className="p-5 h-screen">
      <div className="flex m-2">
        <div>
          <Insights formatName={formatName} />
          <Settings />
        </div>
        <div>
          <PageUsers formatName={formatName} />
          <PageDetails formatName={formatName} />
        </div>
      </div>
    </div>
  );
}
