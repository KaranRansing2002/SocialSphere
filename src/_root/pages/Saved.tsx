import GridPostList from "@/components/global/GridPosts";
import { useGetCurrentUser } from "@/lib/reactQuery/queryMutation";
import { Models } from "appwrite";
import { Bookmark, Loader2 } from "lucide-react"

const Saved = () => {

  const { data: user, isPending } = useGetCurrentUser();

  const posts = user?.save.map((obj: Models.Document) => {
    return {
      ...obj.post,
      creator: {
        imageUrl: user.imageUrl,
        name:user.name
      }
    }
  }).reverse();


  return (
    <div className="common-container ">
      <div className="w-full">
        <div className="flex items-center gap-2 ">
          <Bookmark fill="white" className="scale-125" />
          <h2 className="sm:h2-bold h3-bold">Saved</h2>
        </div>

        <div className="sm:pt-8 pt-4">
          {isPending ? <Loader2 className='animate-spin m-auto h-36' /> : <GridPostList posts={posts} showStats={false} />}
        </div>
      </div>
    </div>
  )
}

export default Saved
