import { Link, useLocation, useNavigate } from "react-router-dom"
import { logo } from '../../assets/index'
import { useUserContext } from "@/contexts/AuthProvider"
import { LogOut } from "lucide-react";
import { Links } from "@/constants";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { toast } from "../ui/use-toast";
import { useSignOutAccount } from "@/lib/reactQuery/queryMutation";

const LeftSidebar = () => {

  const { mutateAsync: signout, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  

  useEffect(() => {
    if (isSuccess) {
      toast({
        className: "text-green-400",
        description: "Successfully signed-out "
      })
      navigate(0);
    }
  }, [isSuccess])

  return (
    <div className='hidden md:flex py-6 flex-col min-w-[270px] bg-dark-2 '>

      <Link to='/' className="gap-2 text-xl flex items-center p-4 px-6 font-extrabold ">
        <img src={logo} className="h-7" alt='logo' />
        <span >Social-Sphere</span>
      </Link>

      <div className="flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-6 pl-8 p-4 pr-6">
          <Link to={`/profile/${user.id}`} className="gap-2 flex items-center p-2">
            <img src={user.imageUrl} className="h-11 w-11 object-cover rounded-full" alt='logo' />
            <div className="flex flex-col">
              <span className="text-light-2">{user.name}</span>
              <span className="text-light-3 text-sm">@{user.username}</span>
            </div>
          </Link>
          {Links.map(link => {
            return <Link to={link.route} key={link.label} className={`flex items-center group gap-3 p-3 hover:bg-primary-500 ${pathname === link.route && 'bg-primary-500'} px-3 transition-all rounded`}>
              <link.icon className={`text-primary-500 transition-all group-hover:text-white ${pathname === link.route && 'text-white'}`} />
              <span>{link.label}</span>
            </Link>
          })}
        </ul>

        <Button onClick={() => signout()} className="place-self-bottom items-center gap-2 w-32 ml-5 font-bold">
          <LogOut className="text-primary-500" />
          <span >Logout</span>
        </Button>
      </div>

    </div>
  )
}

export default LeftSidebar
