import { useUserContext } from "@/contexts/AuthProvider"
import { multiFormatDateString } from "@/lib/utils"
import { Models } from "appwrite"
import { Edit } from "lucide-react"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"

interface postCardProps {
    post: Models.Document
}

const PostCard: React.FC<postCardProps> = ({ post }) => {

    const { user } = useUserContext();
    console.log(post.imageUrl)    

    return (
        <div className="post-card">
            <div className="flex-between">
                <div className="flex gap-2">
                    <Link to={`/profile/${post.creator.$id}`}><img src={post.creator.imageUrl} className="rounded-full object-cover md:h-12 md:w-12 w-9 h-9" /></Link>
                    <div className="flex flex-col gap-1">
                        <Link to={`/profile/${post.creator.$id}`}><p className="sm:small-regular leading-3 font-semibold">{post.creator.name}</p></Link>
                        <div className="flex-center gap-2 text-sm text-light-3">
                            <p >{multiFormatDateString(post.$createdAt)}</p>
                            <p >{post.location}</p>
                        </div>
                    </div>
                </div>

                <Link to={`/update-post/${post.$id}`} className={`${user.id !== post.creator.$id && 'hidden'}`}><Edit className="text-primary-500 h-5 sm:h-8" /></Link>
            </div>

            <Link to={`post/${post.$id}`} className="py-2 flex flex-col gap-2">
                <img src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
                    alt="post image"
                    className="post-card_img"
                    loading="lazy"
                />
                <div className="small-medium lg:base-medium py-3">
                    <p>{post.caption}</p>
                    <ul className="flex gap-2">
                        {
                            post.tags?.map((tag: string) => (
                                <li className="text-blue-300" key={tag}>#{tag}</li>
                            ))
                        }
                    </ul>
                </div>
            </Link>
            
            <PostStats post={post} userId={user.id} />
        </div>
    )
}

export default PostCard
