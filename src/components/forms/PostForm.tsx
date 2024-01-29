import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PostValidation } from "@/lib/validation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import FileUploader from "../global/FileUploader"
import { Input } from "../ui/input"
import { Models } from "appwrite"
import { useCreatePost, useDeletePost, useUpdatePost } from "@/lib/reactQuery/queryMutation"
import { useUserContext } from "@/contexts/AuthProvider"
import { useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"
import { Loader } from "lucide-react"

interface PostFormProps {
    post?: Models.Document,
    action:"update" | "create"
}

const PostForm:React.FC<PostFormProps> = ({ post,action }) => {

    const { mutateAsync: createPost, isPending,isError } = useCreatePost()
    const { mutateAsync: updatePost, isPending: isUpdatingPost,isError:isUpdateError } = useUpdatePost()
    const { mutateAsync: deletePost, isPending: isDeletingPost,isError:isDeleteError } = useDeletePost();

    const { user } = useUserContext();
    const { toast } = useToast();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post.caption : "",
            file: [],
            location: post ? post.location : "",
            tags: post ? post.tags.join(',') : "",
        },
    })

    async function onSubmit(values: z.infer<typeof PostValidation>) {
        if (action === 'update' && post) {
            const updatedPost = await updatePost({
                ...values,
                postId: post.$id,
                imageId: post.imageId,
                imageUrl: post.imageUrl,
            });
            if (!updatedPost) {
                toast({
                    className: 'bg-red-800',
                    variant: "destructive",
                    title: "Something went wrong Please try again. ",
                })
                return;
            }
            toast({
                className:'text-green-400',
                title:'post updated successfully.'
            })
            return navigate(`/posts/${post.$id}`);
        }

        const newPost = await createPost({
            ...values,
            userId: user.id 
        })

        if (!newPost) {
            toast({
                className: 'bg-red-800',
                variant: "destructive",
                title: "Something went wrong Please try again. ",
            })
            return;
        }
        navigate('/');
    }

    async function handleDeletePost() {
        if (!post) return;
        const status = await deletePost({ postId: post.$id, imageId: post.imageId });
        if (!status) {
            toast({
                variant:"destructive",
                title:'Some error occured'
            })
            return;
        }
        toast({
            className:'text-green-400',
            title:'post deleted succesfully'
        })
        navigate('/');
        return;
    }
    
    if (isError || isUpdateError || isDeleteError) {
        toast({
            variant: "destructive",
            title: 'Some error occured'
        });
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl cursor-pointer flex flex-col gap-8">
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Caption</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="shad-textarea custom-scrollbar "
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="!text-red" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Post</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={post?.imageUrl}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Location</FormLabel>
                            <FormControl>
                                <Input type='text' className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">
                                Add Tags (separated by comma " , ")
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Art, Expression, Learn"
                                    type="text"
                                    className="shad-input"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <div className="flex gap-2 justify-end">
                    <Button variant='outline' onClick={() => {navigate('/')}}>Cancel</Button>
                    <Button type="submit" variant='outline' disabled={isPending}>
                        {isPending ? <> <Loader/> <p>{action==='create' ? 'creating' : 'updating'}</p> </> : <p>{action === 'create' ? 'submit' : 'update'}</p>}
                    </Button>
                    {action === 'update' && 
                        <Button variant={'outline'} onClick={handleDeletePost} disabled={isDeletingPost}>
                            <p>delete</p>
                        </Button>
                    }
                </div>
            </form>
        </Form>

    )
}

export default PostForm
