import { Models } from "appwrite"
import { Bookmark, HeartIcon,  } from "lucide-react"
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/reactQuery/queryMutation"
import { useState } from "react"

interface PostStatsProps {
    post: Models.Document,
    userId: string
}

const PostStats: React.FC<PostStatsProps> = ({ post, userId }) => {

    const { mutateAsync: likePost } = useLikePost();
    const { mutateAsync: savePost } = useSavePost();
    const { mutateAsync: deletePost } = useDeleteSavedPost();
    const likesList = post.likes.map((user: Models.Document) => user.$id);

    const { data:user,isPending:isLoadingUser } = useGetCurrentUser();
    const savedPostRecord = user?.save.find(
        (record: Models.Document) => record.post.$id === post.$id
    );
    
    const [likes, setLikes] = useState<Set<string>>(new Set(likesList));
    const [isSavedPost,setIsSavedPost] = useState<boolean>(savedPostRecord ? true : false)

    const handleLike = () => {
        const likess = new Set(likes);
        if (likess.has(user?.$id || '')) {
            likess.delete(user?.$id || '');
        }
        else {
            likess.add(user?.$id || '');
            
        }
        setLikes(likess);
        likePost({ postId: post.$id, likesSet: likess });
    }

    const handleSavePost = () => {
        if (!savedPostRecord) {
            savePost({ postId: post.$id, userId })
            setIsSavedPost(true);
        }
        else {
            deletePost(savedPostRecord.$id);
            setIsSavedPost(false);
        }
    }

    if (isLoadingUser) {
        return;
    }

    return (
        <div className="flex-between">
            <div className="flex-center gap-1">
                <HeartIcon className="cursor-pointer" onClick={handleLike} fill={likes.has(user ? user.$id : '') ? 'red' : 'transparent'} color={likes.has(user?.$id || '') ? 'red' : 'white'} />
                <p>{likes.size}</p>
            </div>
            <Bookmark className="cursor-pointer" onClick={handleSavePost} fill={isSavedPost ? 'white' : 'transparent'} color={'white'} />
        </div>
    )
}

export default PostStats
