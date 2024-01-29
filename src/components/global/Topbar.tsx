import { Link, useNavigate } from "react-router-dom"
import logo from '../../assets/logo.png'
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import { useSignOutAccount } from "@/lib/reactQuery/queryMutation"
import { useEffect } from "react"
import { toast } from "../ui/use-toast"
import { useUserContext } from "@/contexts/AuthProvider"
import profileimg from '../../assets/profile.jpg'

const Topbar = () => {

  const { mutateAsync: signout, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();
  const navigate = useNavigate();

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
    <div className="sticky bg-dark-2 top-0 md:hidden w-full">
      <div className="flex-between p-2 px-4">
        <Link to='/' className="gap-2 flex-center font-extrabold text-lg">
          <img src={logo} className="h-5" alt='logo' />
          <span>Social-Sphere</span>
        </Link>

        <div className="flex items-center gap-1 pr-1">
          <Button onClick={() => signout()}>
            <LogOut className="text-slate-400" />
          </Button>
          <Link to={`/profile/${user.id}`}>
            <img src={user.imageUrl || profileimg} alt='profile' className="rounded-full h-7 w-7 object-cover" />
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Topbar
