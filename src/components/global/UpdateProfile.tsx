import { ProfileProps } from "@/_root/pages/Profile";
import { UserValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FileUploader from "./FileUploader";
import { Textarea } from "../ui/textarea";
import {  useUpdateUser } from "@/lib/reactQuery/queryMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";
import { Loader } from "lucide-react";



const UpdateProfile: React.FC<ProfileProps> = ({ setIsUpdate, currentUser }) => {

    const { mutateAsync: updateUser, isPending } = useUpdateUser();

    const form = useForm<z.infer<typeof UserValidation>>({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            name: currentUser.name,
            username: currentUser.username,
            bio: currentUser.bio || '',
            file: [],
        }
    })

    async function onSubmit(values: z.infer<typeof UserValidation>) {
        console.log(values);
        
        const updatedUser = await updateUser({
            ...values,
            userId: currentUser.$id,
            imageId: currentUser.imageId as string,
            imageUrl: currentUser.imageUrl,
        })

        if (!updatedUser) {
            toast({
                className: 'bg-red-800',
                variant: "destructive",
                title: "Something went wrong Please try again. ",
            })
            return;
        }
        toast({
            className:'text-green-400',
            title:'user updated successfully.'
        })

        setIsUpdate(false);
        return;
    }

    return (
        <div className="common-container">
            <div className="w-full flex flex-col gap-4 ">
                <h2 className="h2-bold">Update Profile</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid md:grid-cols-2">
                            <div className="">
                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="shad-form_label">Add Post</FormLabel>
                                            <FormControl>
                                                <FileUploader
                                                    fieldChange={field.onChange}
                                                    mediaUrl={currentUser?.imageUrl}
                                                    className="rounded-full "
                                                />
                                            </FormControl>
                                            <FormMessage className="shad-form_message" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="p-4 flex flex-col gap-8  ">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="full name" className="shad-input" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="username" className="shad-input" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem className="mt-auto">
                                            <FormLabel>Bio</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="bio" className="shad-input" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                            <Button type="submit" className="bg-dark-3" disabled={isPending}>
                                {isPending ? <><Loader/>&nbsp; Updating</> : 'Update'}
                            </Button>
                            <Button type="button" className="bg-dark-3" onClick={() => { form.reset(); setIsUpdate(false); }}>Cancel</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default UpdateProfile;