import PostForm from '@/components/forms/PostForm';
import { useGetPostById } from '@/lib/reactQuery/queryMutation';
import { Edit, Loader, ShieldAlert } from 'lucide-react';
import React from 'react'
import { useParams } from 'react-router-dom'

const UpdatePost = () => {

    const { id } = useParams();
    const { data: post, isPending } = useGetPostById(id || '');

    if (isPending) {
        return <div className='flex-1 flex-center'><Loader className='animate-spin'/>...Loading</div>
    }

    if (!post) {
        return <div className='flex-1 flex-center'><ShieldAlert/>Some Error Occured please try again</div>
    }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex flex-start gap-3 justify-start w-full">
          <Edit/>
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        <PostForm action="update" post={post} />
      </div>
    </div>
  )
}

export default UpdatePost
