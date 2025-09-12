import { PageUsers } from "./PageUsers";
import { Settings } from "./Settings";
import { Insights } from "./Insights";

export function Home() {
  function formatName(name) {
    const title = name.split("_").join(" ");
    return title.charAt(0).toUpperCase() + title.slice(1);
  }

  return (
    <div className="p-5 h-screen">
      <div className="flex m-2">
        <div>
          <Insights formatName={formatName} />
          <Settings />
        </div>
        <PageUsers formatName={formatName} />
      </div>
    </div>
  );
}
