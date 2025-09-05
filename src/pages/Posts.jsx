 import { CreatePost } from "../components/posts/CreatePost";
import { PagePosts ,} from "../components/posts/PagePosts";

export function Posts() {
  return (
    <div className="flex flex-col h-screen">
      <div >
         <CreatePost/>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <PagePosts />
      </div>
    </div>
  );
}
