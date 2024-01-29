import PostCard from "@/components/global/PostCard";
import UserCard from "@/components/global/UserCard";
import { toast } from "@/components/ui/use-toast";
import { useGetPosts, useGetUsers } from "@/lib/reactQuery/queryMutation";
import { Loader, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {

  const { ref, inView } = useInView();
  const { data: postPages, error, fetchNextPage, hasNextPage, status } = useGetPosts();
  const {data:users,isPending} = useGetUsers(4,true)

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  },[inView])

  if (error) {
    toast({
      variant: "destructive",
      title: "some error occured please refresh!",
      className: 'text-green-400 bg-red'
    });
    return;
  }


  return (
    <div className="flex flex-1 custom-scrollbar overflow-auto ">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="text-left w-full md:h2-bold h3-bold ">Home Feed</h2>
          {(status === 'pending') ? <Loader2 className="animate-spin" /> :
            <ul className="flex flex-col flex-1 gap-5 w-full">
              {
                postPages.pages.map(item => (
                  item && item.documents.map(post=><PostCard post={post} key={post.$id} />)
                ))
              }
            </ul>
          }
          {hasNextPage && (
            <div ref={ref} className="mt-10 flex-end">
              <Loader className="animate-spin" />
            </div>
          )}
        </div>
      </div>

      <div className="hidden xl:flex flex-col w-72 2xl:w-465 px-6 py-10 gap-10  overflow-scroll custom-scrollbar">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isPending && !users ? (
          <Loader className="animate-spin"/>
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {users?.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home
