import GridPostList from "@/components/global/GridPosts";
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast";
import { useGetPosts, useGetSearchPosts } from "@/lib/reactQuery/queryMutation"
import { Models } from "appwrite";
import { Loader, Loader2, Search } from "lucide-react"
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Explore = () => {

  const { data: posts, error, fetchNextPage, hasNextPage,status } = useGetPosts();
  const { ref, inView } = useInView();
  const [search,setSearch] = useState<string | undefined>()
  const debouncedSearch = useDebounce({ value: search, delay: 500 }); 
  const { data: searchedPosts, isPending } = useGetSearchPosts(debouncedSearch || '');

  useEffect(() => {
    if (inView && !search) {
      fetchNextPage();
    }
  },[inView,search])

  if (error) {
    toast({
      title: "some error occured",
      className:'text-red'
    })
    return;
  }

  return (
    <div className="explore-container">
      <div className="explore-inner_container ">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="w-full rounded-lg flex px-1 gap-1 flex-center place-self-start max-w-3xl">
          <input onChange={(e)=>setSearch(e.target.value)} className="bg-dark-4 border-none focus:outline-none p-3 w-full rounded-lg" placeholder="search posts"/>
          <Button className="bg-dark-3 "><Search className=""/></Button>
        </div>

        <h2 className="h3-bold md:h2-bold w-full">Popular</h2>
        {status==='pending' ? <Loader className='animate-spin'/> : null}
      </div>

      <div className="flex flex-wrap w-full max-w-5xl">
        {search ? 
          <SearchedResults isPending={isPending} searchedPosts={searchedPosts} />
          :
          posts?.pages.map((item, index) => (
            item && <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        }
      </div>
      {hasNextPage && !search && (
        <div ref={ref} className="mt-10 flex-end">
          <Loader className="animate-spin"/>
        </div>
      )}
    </div>
  )
}

interface debounceProps<T>{
  value: T,
  delay:number
}

const useDebounce = <T,>({ value, delay }: debounceProps<T>): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay)
    
    return () => {
      clearTimeout(handler);
    }
  }, [value, delay])
  
  return debouncedValue

}

const SearchedResults = ({isPending,searchedPosts}:{isPending: boolean, searchedPosts: Models.DocumentList<Models.Document> | undefined}) => {
  if (isPending) {
    return <Loader2 className="animate-spin" />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
}

export default Explore
