import { INavLink } from '@/types';
import {BookImage, Bookmark, HomeIcon, ImagePlus, Users,} from 'lucide-react'

export const Links:INavLink[] = [
{
    icon: HomeIcon,
    route: "/",
    label: "Home",
},
{
    icon: BookImage,
    route: "/explore",
    label: "Explore",
},
{
    icon: Users,
    route: "/all-users",
    label: "People",
},
{
    icon: Bookmark,
    route: "/saved",
    label: "Saved",
},
{
    icon: ImagePlus,
    route: "/create-post",
    label: "Create Post",
},
];
