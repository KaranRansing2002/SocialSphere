import GridPostList from "@/components/global/GridPosts";
import UpdateProfile from "@/components/global/UpdateProfile";
import { Button } from "@/components/ui/button";
import { useGetCurrentUser, useGetUserById } from "@/lib/reactQuery/queryMutation"
import { Models } from "appwrite";
import { Edit, Loader2, Mail } from "lucide-react";
import React, { useEffect, useState, SetStateAction } from "react";
import { useParams } from "react-router-dom";


const Profile = () => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const { data: currentUser, isPending } = useGetCurrentUser();

  if (isPending || !currentUser) {
    return <div className="p-16 w-full flex-center">
      <Loader2 className="animate-spin" />
    </div>
  }

  if (isUpdate)
    return <UpdateProfile setIsUpdate={setIsUpdate} currentUser={currentUser}/>
  return <RenderProfile setIsUpdate={setIsUpdate} currentUser={currentUser} />
}

export interface ProfileProps {
  setIsUpdate: React.Dispatch<SetStateAction<boolean>>,
  currentUser: Models.Document,
}

const RenderProfile: React.FC<ProfileProps> = ({ setIsUpdate, currentUser }) => {

  const { id } = useParams();
  const { data: user, isPending: isFetching } = useGetUserById(id || '')


  if ( !user || isFetching || !currentUser) {
    return <div className="p-16 w-full flex-center">
      <Loader2 className="animate-spin" />
    </div>
  }

  return (
    <div className="common-container">
      <div className="w-full flex flex-col gap-4">
        <h2 className="h2-bold">Profile</h2>
        <div className="gap-2 flex items-center w-full  ">
          <img src={user.imageUrl} className="h-16 w-16 sm:h-24 sm:w-24 object-cover rounded-full" alt='logo' />
          <div className="flex flex-col">
            <span className="text-light-2 sm:text-2xl md:text-4xl  text-xl">{user.name}</span>
            <span className="text-light-3 sm:text-xl">@{user.username}</span>
          </div>
          {currentUser.$id === user.$id && <Edit onClick={() => setIsUpdate(true)} className="ml-auto cursor-pointer text-primary-500" />}
        </div>
        <div className="flex gap-2 p-2">
          <Mail className="text-primary-500" />
          <p className="text-light-3 hover:text-primary-500">{user.email}</p>
        </div>
        <div className="sm:w-1/3 p-2">
          <p className="text-light-2 ">{user.bio}</p>
        </div>

        <RenderPosts user={user} currentUser={currentUser} />
      </div>
    </div>
  )
}


const RenderPosts = ({ user, currentUser }: { user: Models.Document, currentUser: Models.Document }) => {

  const [select, setSelect] = useState<string>('post')

  const sameUser = user.$id === currentUser.$id;

  const [posts, setPosts] = useState<Models.Document[] | null>();

  useEffect(() => {
    const userPosts = user.posts.map((obj: Models.Document) => {
      return {
        ...obj,
        creator: {
          imageUrl: user.imageUrl,
          name: user.name
        }
      }
    })
    setPosts(userPosts);
  }, [])


  const handleClick = (type: string) => {
    if (type === 'post') {
      setSelect('post');
      const userPosts = user.posts.map((obj: Models.Document) => {
        return {
          ...obj,
          creator: {
            imageUrl: user.imageUrl,
            name: user.name
          }
        }
      })
      setPosts(userPosts);
    }
    else if (type === 'saved') {
      setSelect('saved')
      const userSavedPosts = user.save.map((obj: Models.Document) => {
        return {
          ...obj.post,
          creator: {
            imageUrl: user.imageUrl,
            name: 'click for more details'
          }
        }
      })
      setPosts(userSavedPosts)
    }
    else {
      setSelect('liked');
      const userLikedPosts = user.liked.map((obj: Models.Document) => {
        return {
          ...obj,
          creator: {
            imageUrl: user.imageUrl,
            name: 'click for more details'
          }
        }
      })
      setPosts(userLikedPosts);
    }
  }

  return (
    <div className=" flex flex-col gap-2">
      <div className="flex gap-2">
        <Button onClick={() => handleClick('post')} className={select === 'post' ? 'bg-dark-3' : ''}>Posts</Button>
        {sameUser && <Button onClick={() => handleClick('saved')} className={select === 'saved' ? 'bg-dark-3' : ''}>Saved</Button>}
        {sameUser && <Button onClick={() => handleClick('liked')} className={select === 'liked' ? 'bg-dark-3' : ''}>Liked</Button>}
      </div>

      {posts && <GridPostList posts={posts} showStats={false} />}
    </div>
  )
}

export default Profile
