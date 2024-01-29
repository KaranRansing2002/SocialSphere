import PostForm from "@/components/forms/PostForm"
import { ImagePlus } from "lucide-react"

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex flex-start gap-3 justify-start w-full">
          <ImagePlus />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>
        <PostForm action="create" />
      </div>
    </div>
  )
}

export default CreatePost
