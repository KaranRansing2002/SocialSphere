import PostStats from "@/components/global/PostStats";
import { useUserContext } from "@/contexts/AuthProvider";
import { useDeletePost, useGetPostById } from "@/lib/reactQuery/queryMutation";
import { multiFormatDateString } from "@/lib/utils";
import { Edit, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom"

const PostDetails = () => {

  const { id: postId } = useParams();
  const { data: post, isPending } = useGetPostById(postId || '');
  const { user } = useUserContext();
  const { mutateAsync: deletePost } = useDeletePost();
  const navigate = useNavigate();

  const handleDelete = async() => {
    await deletePost({ postId: postId || '', imageId: post?.imageId });
    navigate('/');
  }
  
  if (isPending || !post)
    return;

  console.log(user,post);
  
  return (
    <div className="flex-1 custom-scrollbar overflow-auto sm:p-8 p-4 md:flex-center ">

      <div className="flex flex-col md:flex-row w-full ">
        <div className="flex flex-col w-full bg-dark-3 p-3 rounded-t-xl sm:rounded ">
          <div className="flex-between">
            <div className="flex gap-2">
              <Link to={`/profile/${post.creator.$id}`}><img src={post.creator.imageUrl} className="rounded-full md:h-12 object-cover md:w-12 h-9 w-9" /></Link>
              <div className="flex flex-col gap-1">
                <Link to={`/profile/${post.creator.$id}`}><p className="sm:small-regular leading-3 font-semibold">{post.creator.name}</p></Link>
                <div className="flex-center gap-2 text-sm text-light-3">
                  <p >{multiFormatDateString(post.$createdAt)}</p>
                  <p >{post.location}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              {user.id === post.creator.$id && <Trash2 className="text-red cursor-pointer" onClick={handleDelete}/>}
              <Link to={`/update-post/${post.$id}`} className={`${user.id !== post.creator.$id && 'hidden'}`}><Edit className="text-primary-500 h-5 sm:h-8" /></Link>
            </div>
          </div>

          <div className="py-2 space-y-1">
            <img src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="post image"
              className="post-card_img"
            />
            <PostStats post={post} userId={user.id} />
          </div>
        </div>

        <div className="small-medium lg:base-medium py-3 px-2 md:ml-1 bg-dark-3 md:max-w-[300px] rounded w-full">
          <p>{post.caption}</p>
          <ul className="flex gap-2">
            {
              post.tags?.map((tag: string) => (
                <li className="text-blue-300" key={tag}>#{tag}</li>
              ))
            }
          </ul>
          <hr className="border w-full border-dark-4/80 mt-2" />
        </div>
      </div>

    </div>
  )
}

export default PostDetails  
