import { Buttons } from "../components/posts/Buttons";
import { CreatePost } from "../components/posts/CreatePost";

export function Posts() {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <CreatePost />
      </div>

      <div className="mx-auto p-4">
        <Buttons />
      </div>
    </div>
  );
}
