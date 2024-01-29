import * as z from "zod"

export const signupValdtn = z.object({
    name:z.string().min(2,{message : "too short"}).max(50),
    username: z.string().min(2, { message: "too short" }).max(50),
    email: z.string().email(),
    password : z.string().min(8,{message: 'password must be atleast 8 characters long'})
})

export const signinValdtn = z.object({
    email: z.string().email(),
    password : z.string().min(8,{message: 'password must be atleast 8 characters long'})
})

export const PostValidation = z.object({
    caption: z.string().min(5,{message:"caption should be of atleast 5 characters"}).max(1000),
    file: z.custom<File[]>(),
    location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
    tags: z.string(),
})

export const UserValidation = z.object({
    name: z.string().min(3, { message: 'name should be atleast 3 chars long' }).max(50),
    file: z.custom<File[]>(),
    bio: z.string(),
    username:z.string().min(3,{ message: 'username should be atleast 3 chars long' }).max(50),
})
