import { signinValdtn, signupValdtn } from '@/lib/validation';
import { LucideIcon } from 'lucide-react';
import * as z from "zod"

export type Fields = "name" | "username" | "email" | "password"
export type FormValues = z.infer<typeof signupValdtn> | z.infer<typeof signinValdtn>;

export interface TContextType{
  user: TUser,
  isLoading: boolean,
  setUser: React.Dispatch<React.SetStateAction<TUser>>,
  isAuthenticated: boolean,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
  checkAuthUser: ()=>Promise<boolean>
}

export type TUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};
  
export type NewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type TUpdateUser = {
  userId: string,
  username:string,
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INavLink = {
  icon: LucideIcon;
  route: string;
  label: string;
};


export type TNewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type TUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};

  
  