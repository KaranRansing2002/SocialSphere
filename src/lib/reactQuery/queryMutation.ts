import { NewUser, TNewPost, TUpdatePost, TUpdateUser } from "@/types";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewUser, createPost, deletePost, deleteSavedPost, getCurrentUser, getInfinitePosts, getPostById, getRecentPosts, getSearchedPosts, getUserById, getUsers, likePost, savePost, signOutAccount, signinUser, updatePost, updateUser } from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";
import { Models } from "appwrite";

const { GET_RECENT_POSTS,SEARCH_POSTS, GET_USER_BY_ID, GET_INFINITE_POSTS ,GET_POST_BY_ID,GET_POSTS,GET_CURRENT_USER,GET_USERS } = QUERY_KEYS

export const useCreateUser = () => {
    return useMutation({
        mutationFn: (user: NewUser) => createNewUser(user)
    })
}

export const useSigninAccount = () => {
    return useMutation({
        mutationFn: (user: { email: string, password: string }) => signinUser(user)
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}

export const useGetCurrentUser = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      queryFn: getCurrentUser,
    });
};
export const useCreatePost = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (post: TNewPost) => createPost(post),
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: [GET_RECENT_POSTS]
            })
        }
    })
}

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [GET_RECENT_POSTS],
        queryFn: getRecentPosts
    })
}


export const useLikePost = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: ({ postId, likesSet }: { postId: string, likesSet: Set<string> }) => likePost(postId, likesSet),
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: [GET_POST_BY_ID]
            });
            client.invalidateQueries({
                queryKey: [GET_RECENT_POSTS],
            });
            client.invalidateQueries({
                queryKey: [GET_POSTS],
            });
            client.invalidateQueries({
                queryKey: [GET_CURRENT_USER],
            });
        }
    })
}

export const useSavePost = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: ({ postId, userId }: { postId: string, userId: string }) => savePost(postId, userId),
        onSuccess: (data) => {
            client.invalidateQueries({
                queryKey: [GET_RECENT_POSTS,data?.$id],
            });
            client.invalidateQueries({
                queryKey: [GET_POSTS],
            });
            client.invalidateQueries({
                queryKey: [GET_CURRENT_USER],
            });
        }
    })
}

export const useDeleteSavedPost = () => {
    const client = useQueryClient();

    return useMutation({
        mutationFn: (savedPostId:string) => deleteSavedPost(savedPostId),
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: [GET_RECENT_POSTS],
            });
            client.invalidateQueries({
                queryKey: [GET_POSTS],
            });
            client.invalidateQueries({
                queryKey: [GET_CURRENT_USER],
            });
        }
    })
}

export const useGetPostById = (postId:string) => {
    return useQuery({
        queryKey: [GET_POST_BY_ID, postId],
        queryFn: () => getPostById(postId),
        enabled:!!postId
    })
}

export const useUpdatePost = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (post: TUpdatePost) => updatePost(post),
        onSuccess: (data) => {
            client.invalidateQueries({
                queryKey:[GET_POST_BY_ID,data?.$id]
            })
        }
    })
}

export const useDeletePost = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: ({postId,imageId}:{postId:string,imageId:string}) => deletePost(postId,imageId),
        onSuccess: () => {
            client.invalidateQueries({
                queryKey:[GET_RECENT_POSTS]
            })
        }
    })
}

export const useGetPosts = () => {
    return useInfiniteQuery({
        queryKey: [GET_INFINITE_POSTS],
        queryFn: getInfinitePosts,
        initialPageParam: 0,
        getNextPageParam: (lastPage:any) => {
            if (lastPage && lastPage.documents.length === 0)
                return null;
            
            const lastPageId = lastPage?.documents[lastPage.documents.length - 1].$id;
            return lastPageId
        },
    })
}

export const useGetSearchPosts = (search:string) => {
    return useQuery({
        queryKey: [SEARCH_POSTS, search],
        queryFn: () => getSearchedPosts(search),
        enabled:!!search
    })
}

export const useGetUserById = (userId:string) => {
    return useQuery({
        queryKey: [GET_USER_BY_ID, userId],
        queryFn: () => getUserById(userId),
        enabled:!!userId
    })
}

export const useUpdateUser = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: (user: TUpdateUser) => updateUser(user),
        onSuccess: (data) => {
            client.invalidateQueries({
                queryKey:[GET_USER_BY_ID,data?.$id,GET_USERS]
            })
        }
    })
}

export const useGetUsers = (limit?:number,creators?:boolean) => {
    return useQuery({
        queryKey:[GET_USERS],
        queryFn: () => getUsers(limit,creators),
    })
}