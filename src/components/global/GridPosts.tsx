import { useUserContext } from "@/contexts/AuthProvider";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import emptyImg from '../../assets/emptyImg.png'



type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList:React.FC<GridPostListProps> = ({posts,showUser = true,showStats = true,}) => {
  const { user } = useUserContext();

  if (posts.length === 0) {
    return (
      <div className="flex-center flex-col p-8 gap-2">
        <img src={emptyImg} className="h-72 rounded-lg"  />
        <h2 className="h3-bold">No Posts</h2>
      </div>
    )
  }

  return (
    <ul className="grid md:grid-cols-auto sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 w-full">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80 mb-2 ">
          <Link to={`/post/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1 ">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;